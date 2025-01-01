"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

// this server action will send the user to login if he's logged out and tries to create new doc

export async function createNewDocument() {
  auth().protect();

  const { sessionClaims } = await auth(); //sessionclaims are from clerk

  //creating new document
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function InviteUserToDocument(roomId: string, email: string) {
  auth().protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

      return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteDocument(roomId: string) {
  auth().protect();

  try {
    //delete doc ref itself
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    //delete toom ref in user's collection
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    //delete room in liveblocks
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

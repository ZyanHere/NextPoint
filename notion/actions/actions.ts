"use server";

import { adminDb } from "@/firebase-admin";
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

    return {docId: docRef.id,}
}

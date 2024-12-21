import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

function DocLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  auth.protect();
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;

 
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// function DocLayout({
//   children,
//   params: { id },
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   const { userId } = auth();

//   if (!userId) {
//     // Redirect unauthenticated users to the sign-in page
//     redirect("/sign-in");
//   }

//   return <div>{children}</div>;
// }

// export default DocLayout;

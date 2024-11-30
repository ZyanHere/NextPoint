// import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
// import { getFireStore } from "firebase-admin/firestore";

// const serviceKey = require("@service_key.json");

// let app: App;

// if(getApps().length === 0) {
//     app = initializeApp({
//         credential: cert(serviceKey),
//     });
// }else{
//     app = getApp();
// }

// const adminDb = getFireStore(app);

// export { app as adminApp, adminDb}

import { initializeApp, cert, getApp, getApps, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// Import the service key using import syntax
import serviceKey from "./service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey as any), // Ensure type safety if TypeScript complains
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };


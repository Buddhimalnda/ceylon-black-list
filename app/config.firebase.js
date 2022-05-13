import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyBamCYn6SGDBnzxYMrG36PaBHiar0ly5ok",
  // authDomain: "gta-test-app.firebaseapp.com",
  // databaseURL:
  //   "https://gta-test-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "gta-test-app",
  // storageBucket: "gta-test-app.appspot.com",
  // messagingSenderId: "163911209533",
  // appId: "1:163911209533:web:cdd626d62c04a198ee9054",
  apiKey: "AIzaSyBYuYQ9exenWK5ZuKRms6I1qjw8x9UZfyQ",
  authDomain: "ceylon-black-list.firebaseapp.com",
  projectId: "ceylon-black-list",
  storageBucket: "ceylon-black-list.appspot.com",
  messagingSenderId: "117258307471",
  appId: "1:117258307471:web:690d328b990851a3fbadfa",
};
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
function intializeServices() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const rdb = getDatabase(firebaseApp);
  const isConfigured = getApps().length > 0;
  return { isConfigured, firebaseApp, auth, db, rdb };
}

function connectToEmulators({ auth, firestore }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
}

export function getFirebase() {
  const services = intializeServices();
  if (!services.isConfigured) {
    // connectToEmulators(services);
  }
  return services;
}

export function onAuth(callback) {
  const { auth } = getFirebase();
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

//firebase functions

export function steamPoints() {
  const { db, auth } = getFirebase();
  const pointCol = collection(db, "points");
  const pointQuery = query(pointCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(pointQuery, (snap) => {
      const points = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(points);
    });

  const addData = (data) =>
    addDoc(pointCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });
  const updateData = (who, value) => {
    const doc = doc(pointCol, who);
    updateDoc(doc, { value: value });
  };

  return { stream, addData, updateData };
}

export function streamCrew() {
  const { db, auth } = getFirebase();
  const crewCol = collection(db, "crews");
  //   const crewsQuery = query(crewCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(crewCol, (snap) => {
      const crews = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(crews);
    });
  const addData = (data) =>
    addDoc(crewCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}

export function streamCar() {
  const { db, auth } = getFirebase();
  const carCol = collection(db, "cars");
  //   const crewsQuery = query(crewCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(carCol, (snap) => {
      const cars = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(cars);
    });
  const addData = (data) =>
    addDoc(carCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}
export function streamUser() {
  const { db, auth } = getFirebase();
  const userCol = collection(db, "users");
  //   const crewsQuery = query(crewCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(userCol, (snap) => {
      const users = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(users);
    });
  const addData = (data) =>
    addDoc(userCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}
export function streamChallenge() {
  const { db, auth } = getFirebase();
  const challengeCol = collection(db, "challenges");
  const crewsQuery = query(
    challengeCol,
    where("main.date", ">=", new Date().toISOString()) //with out all
  );
  const stream = (callback) =>
    onSnapshot(crewsQuery, (snap) => {
      const challenges = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data().main,
        };
      });
      callback(challenges);
    });

  const addData = (data) =>
    addDoc(challengeCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}

export function streamMap() {
  const { db } = getFirebase();
  const mapCol = collection(db, "maps");
  //   const crewsQuery = query(crewCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(mapCol, (snap) => {
      const maps = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(maps);
    });
  const addData = (data) =>
    addDoc(challengeCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}

export function streamChallengeOnceList({ challengeID }) {
  const { db } = getFirebase();
  const challengeColList = collection(
    db,
    "challenges",
    challengeID,
    "acceptlist"
  );
  //   const crewsQuery = query(crewCol, orderBy("value"));

  const stream = (callback) =>
    onSnapshot(challengeColList, (snap) => {
      const acceptlist = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(acceptlist);
    });

  const addData = (data) =>
    addDoc(challengeCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}

export function streamCrewMember({ crewID }) {
  const { db, auth } = getFirebase();
  const crewCol = collection(db, "crews", crewID, "members");
  //   const crewsQuery = query(crewCol, orderBy("value"));
  const stream = (callback) =>
    onSnapshot(crewCol, (snap) => {
      const crews = snap.docs.map((doc) => {
        const isDelivered = !doc.metadata.hasPendingWrites;
        return {
          isDelivered,
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(crews);
    });
  const addData = (data) =>
    addDoc(crewCol, {
      createAt: {
        auth: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      },
      ...data,
    });

  return { stream, addData };
}

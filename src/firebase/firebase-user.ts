import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const getUserIdByEmail = async (email: string) => {
  const userCollection = collection(db, "users");
  const q = query(userCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error(`Користувача з email ${email} не знайдено.`);
  }

  const usersId = querySnapshot.docs[0].id;
  return usersId;
};

export const addUserToDB = async (userId: string, email: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return;
  }

  await setDoc(userDocRef, {
    email,
  });

  console.log("Користувача додано до бази даних");
};

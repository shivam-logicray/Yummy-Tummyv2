import { all } from "axios";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/config";

const useFetchCollection = (collectionName) => {
  let [data, setData] = useState([]);
  let [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataCollection();
  }, []);

  let getDataCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (docSnap) => {
        const allData = docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };
  return { data, isloading };
};

export default useFetchCollection;

 import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
 
 const useFetchDocument = (collectionname,documentId) => {
    const[document,setDocument]=useState(null)
    useEffect(()=>{getDocumentData()},[])
    let getDocumentData=async()=>{
        const docRef=doc(db,collectionname,documentId)
        try{
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            const obj={id:documentId,...docSnap.data()}
            setDocument(obj)
        }
    }catch (err){
        toast.error(err.message)
    }
    }
   return (
     {document}
   )
 }
 
 export default useFetchDocument
 
import React from 'react';
import { db } from '../../FireStore/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { readDocuments } from '../../FireStore/firestoreOperations.js';
import { useAuth0 } from '@auth0/auth0-react';


const TestFirebase = () => {
  const { user } = useAuth0();
  const writeToFirestore = async () => {
    console.log('writeToFirestore() called')
    try {
      const docRef = await addDoc(collection(db, 'testCollection'), {
        testField: 'Hello, Firebase!',
      });
      console.log('Document written with ID: ', docRef.id);
      console.log('user: ', user)
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <button onClick={() => writeToFirestore().catch(console.error)}>Test Firestore Write</button>
      <button onClick={() => readDocuments('recipes').catch(console.error)}>Test Firestore Read</button>
    </div>
  );
};

export default TestFirebase;

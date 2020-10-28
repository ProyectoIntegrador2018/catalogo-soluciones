import { firestore } from './firebase';

import firebase from 'firebase/app';
import 'firebase/functions';

export const getCatalogData = async (attribute) => {
  const ref = firestore.collection(attribute);

  let data = [];

  let element;

  await ref
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        element = doc.data();
        element.id = doc.id;
        data.push(element);
      });
    })
    .catch((err) => {
      console.log('Error getting data', err);
    });

  return data;
};

export const insertNewSolution = async (solution, orgName) => {
  firestore.collection('solutions').add(solution);

  const sendNewSolutionEmail = firebase
    .functions()
    .httpsCallable('sendNewSolutionEmail');
  sendNewSolutionEmail({
    name: solution.solutionName,
    org: orgName,
  });
};

export const updateSolution = async (solution, id) => {
  firestore.collection('solutions').doc(id).update(solution);
};

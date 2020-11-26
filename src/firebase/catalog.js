import { firestore, storage } from './firebase';

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

const uploadFile = async (pathname, file) => {
  return new Promise((resolve, reject) => {
    storage
      .child(pathname)
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          resolve(url);
        });
      })
      .catch(() => {
        reject();
      });
  });
};

export const insertNewSolution = async (solution, orgName) => {
  const {
    solutionName,
    descriptionPitch,
    descriptionSuccess,
    price,
    reciprocity,
    category,
    organizationID,
    approved,
    solutionFlyer,
  } = solution;
  const solutionId = await firestore
    .collection('solutions')
    .add({
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
      reciprocity,
      category,
      organizationID,
      approved,
    })
    .then((docRef) => {
      if (solutionFlyer) {
        uploadFile(
          `${organizationID}/${docRef.id}/flyer.jpeg`,
          solutionFlyer,
        ).then((url) => {
          firestore.collection('solutions').doc(docRef.id).update({
            flyer: url,
          });
        });
      }
      return docRef.id;
    });

  const sendNewSolutionEmail = firebase
    .functions()
    .httpsCallable('sendNewSolutionEmail');
  sendNewSolutionEmail({
    name: solution.solutionName,
    org: orgName,
  });

  return solutionId;
};

export const updateSolution = async (solution, id, organizationID) => {
  const {
    solutionName,
    descriptionPitch,
    descriptionSuccess,
    price,
    reciprocity,
    category,
    solutionFlyer,
  } = solution;
  if (solutionFlyer) {
    uploadFile(`${organizationID}/${id}/flyer.jpeg`, solutionFlyer).then(
      (url) => {
        firestore.collection('solutions').doc(id).update({
          flyer: url,
        });
      },
    );
  }
  firestore.collection('solutions').doc(id).update({
    solutionName,
    descriptionPitch,
    descriptionSuccess,
    price,
    reciprocity,
    category,
  });
};

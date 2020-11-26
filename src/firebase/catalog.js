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
    flyer,
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
      if (flyer) {
        uploadFile(
          `${organizationID}/${docRef.id}/flyer.jpeg`,
          flyer,
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

export const updateSolution = async(solution, id, organizationID) => {
  return new Promise((resolve, _) => {
    const sol = {...solution, id};
    if (typeof sol.flyer !== 'string') {
      uploadFile(`${organizationID}/${id}/flyer.jpeg`, 
        sol.flyer).then(
        (url) => {
          firestore.collection('solutions').doc(id).update({
            flyer: url,
          });
          resolve({...sol, flyer: url})
        },
      );
    } else {
      firestore.collection('solutions').doc(id).update({
        solutionName: sol.solutionName,
        descriptionPitch: sol.descriptionPitch,
        descriptionSuccess: sol.descriptionSuccess,
        price: sol.price,
        reciprocity: sol.reciprocity,
        category: sol.category,
      });
      resolve(sol)
    }
  });
};

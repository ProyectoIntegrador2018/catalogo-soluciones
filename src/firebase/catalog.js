import { firestore } from './firebase';

export const getCatalogData = async (attribute) => {
  const ref = firestore.collection(attribute);

  let data = [];

  await ref
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting data', err);
    });

  return data;
};

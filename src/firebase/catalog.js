import { firestore } from './firebase';

export const getCatalogData = async (attribute) => {
  const ref = firestore.collection(attribute);

  let data = [];

  // This element is used to add id as attribute to organizations (users).
  let element;

  await ref
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (attribute === 'users') {
          element = doc.data();
          element.id = doc.id;
          data.push(element);
        } else {
          data.push(doc.data());
        }
      });
    })
    .catch((err) => {
      console.log('Error getting data', err);
    });

  return data;
};

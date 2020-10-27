import { firestore } from './firebase';

export const deleteUserSolution = (id) => {
  firestore
    .collection('solutions')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
};

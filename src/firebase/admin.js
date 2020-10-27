import { firestore } from './firebase';

export const approveRequest = (id, collection) => {
  console.log('approved!', id);

  firestore
    .collection(collection)
    .doc(id)
    .set(
      {
        approved: true,
      },
      { merge: true },
    )
    .then(() => {
      console.log('Document succesffully approved!');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
};

export const rejectRequest = (id, collection) => {
  console.log('rejected :(', id);

  firestore
    .collection(collection)
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
};

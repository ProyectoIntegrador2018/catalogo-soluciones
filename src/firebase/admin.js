import { firestore } from './firebase';
import firebase from 'firebase/app';
import 'firebase/functions';

export const approveRequest = (id, collection, message) => {
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

  const sendUserApprovedEmail = firebase
    .functions().httpsCallable('sendUserApprovedEmail');
  sendUserApprovedEmail(message);
};

export const rejectRequest = (id, collection, message) => {
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
  
  const sendUserRejectedEmail = firebase
    .functions().httpsCallable('sendUserRejectedEmail');
  sendUserRejectedEmail(message);
};

import { firestore, functions } from './firebase';

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

  const sendUserApprovedEmail = functions.httpsCallable(
    'sendUserApprovedEmail',
  );
  sendUserApprovedEmail(message);

  if (message.solutionName) {
    const sendSolutionApprovedEmail = functions.httpsCallable(
      'sendSolutionApprovedEmail',
    );
    sendSolutionApprovedEmail(message);
  } else {
    const sendUserApprovedEmail = functions.httpsCallable(
      'sendUserApprovedEmail',
    );
    sendUserApprovedEmail(message);
  }
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

  if (message.solutionName) {
    const sendSolutionRejectedEmail = functions.httpsCallable(
      'sendSolutionRejectedEmail',
    );
    sendSolutionRejectedEmail(message);
  } else {
    const sendUserRejectedEmail = functions.httpsCallable(
      'sendUserRejectedEmail',
    );
    sendUserRejectedEmail(message);
  }
};

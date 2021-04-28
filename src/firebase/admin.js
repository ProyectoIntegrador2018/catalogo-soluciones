import { firestore, functions } from './firebase';
import ACCOUNT_STATUS from '../constants/account-status';

export const approveRequest = (id, collection, message) => {
  const sendUserApprovedEmail = functions.httpsCallable(
    'sendUserApprovedEmail',
  );
  sendUserApprovedEmail(message);

  let approvedAttributes;

  if (message.solutionName) {
    const sendSolutionApprovedEmail = functions.httpsCallable(
      'sendSolutionApprovedEmail',
    );
    sendSolutionApprovedEmail(message);
    approvedAttributes = { approved: true };
  } else {
    const sendUserApprovedEmail = functions.httpsCallable(
      'sendUserApprovedEmail',
    );
    sendUserApprovedEmail(message);
    approvedAttributes = { status: ACCOUNT_STATUS.Approved };
  }

  firestore
    .collection(collection)
    .doc(id)
    .set(approvedAttributes, { merge: true })
    .then(() => {
      console.log('Document succesffully approved!');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
};

export const rejectRequest = async (id, collection, message) => {
  console.log('rejected :(', id);

  if (message.solutionName) {
    const sendSolutionRejectedEmail = functions.httpsCallable(
      'sendSolutionRejectedEmail',
    );
    sendSolutionRejectedEmail(message);
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
  } else {
    const sendUserRejectedEmail = functions.httpsCallable(
      'sendUserRejectedEmail',
    );
    sendUserRejectedEmail(message);
    firestore
      .collection(collection)
      .doc(id)
      .set({ status: ACCOUNT_STATUS.Rejected }, { merge: true })
      .then(() => {
        console.log('Document succesffully updated!');
      })
      .catch((err) => {
        console.log('There was an error!', err);
      });
  }
};

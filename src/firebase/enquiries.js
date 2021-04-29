import firebase from 'firebase/app';
import { firestore, functions } from './firebase';

export const creatNewEnquiry = async (params) => {
  const {
    organizationID,
    contactID,
    toEmail,
    fromEmail,
    orgName,
    service,
    name,
    enquiringOrg,
    message,
  } = params;

  try {

    const enquiryId = await firestore
      .collection('enquiries')
      .add({
        organizationID,
        contactID,
        toEmail,
        fromEmail,
        orgName,
        service,
        name,
        enquiringOrg,
        message,
        created: firebase.firestore.Timestamp.now(),
        answered: false,
      });

    const sendContactEmail = functions.httpsCallable('sendContactEmail');
    await sendContactEmail({
      toEmail,
      fromEmail,
      orgName,
      service,
      name,
      org: enquiringOrg,
      message,
    });

    return enquiryId;
  } catch(e) {
    throw e;
  }
};

export const toggleAnswered = (params) => {
  const {
    id,
    answered,
  } = params;

  return firestore.collection('enquiries').doc(id).update({ answered });

};

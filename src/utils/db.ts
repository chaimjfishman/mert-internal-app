import { firebase } from './firebaseConfig';
import { User, Shift, Contact} from '../constants/collectionTypes';

const firestore = firebase.firestore();
const usersRef = firestore.collection('users');
const shiftsRef = firestore.collection('shifts');
const callsRef = firestore.collection('calls');
const whitelistRef = firestore.collection('userWhitelist');
const contactsRef = firestore.collection('contacts');

export async function confirmWhitelist(email: string): Promise<any> {
    //TODO: Error handling
    const firestoreUserDocument: any = await whitelistRef.doc(email).get();
    return firestoreUserDocument.exists;
}

export async function createUserDocument(uid: string, dataObj: User) {
    //TODO: Error handling
    await usersRef.doc(uid).set(dataObj);
}

export async function createShiftsDocument(uid: string, dataObj: Shift) {
    //TODO: Error handling
    await shiftsRef.doc(uid).set(dataObj);
}

export async function getUserDocument(uid: string): Promise<any> {
    //TODO: Error handling
    const firestoreUserDocument: any = await usersRef.doc(uid).get()
    if (!firestoreUserDocument.exists) {
        alert("User does not exist anymore.");
        throw 'User does not exist';
    }

    const user: User = firestoreUserDocument.data();
    return user;
}

export async function getUserShifts(uid: string): Promise<any> {
    const snapshot: any = await shiftsRef.where("userID", "==", uid).orderBy("startTime", "asc").get();
    const data: any = snapshot.docs.map(doc => doc.data());
    data.forEach(doc => doc.startTime = doc.startTime.toDate());
    data.forEach(doc => doc.endTime = doc.endTime.toDate());
    return data;
}

export async function getContacts(): Promise<any> {
    const contacts: any = await contactsRef.get();
    const data: any = contacts.docs.map(doc => doc.data());
    data.forEach(doc => doc.name = doc.name);
    data.forEach(doc => doc.number = doc.number);
    return data;
}

export async function getMonthlyHours(uid: string): Promise<any> {
    const listShifts: Shift[] = await getUserShifts(uid);
    const now = new Date()
    let monthlyHours = 0.0;
    console.log(listShifts.length)
    listShifts.forEach(shift => {
        const shiftStartDate = shift.startTime
        const shiftEndDate = shift.endTime
        if (shift.endTime < now && shift.endTime.getMonth() == now.getMonth() && shift.endTime.getFullYear() == now.getFullYear() ) {
            monthlyHours += (shiftEndDate.getTime() - shiftStartDate.getTime()) / (1000 * 60 * 60)
        }
    });
    return monthlyHours;
}

export async function getNextShift(uid: string): Promise<any> {
    const currTime = new Date();
    const snapshot: any = await shiftsRef
        .where("userID", "==", uid)
        .orderBy("startTime", "asc")
        .startAt(currTime)
        .get();
    let upcomingShift: Shift = snapshot.docs[0].data();
    console.log(upcomingShift);
    upcomingShift.startTime = upcomingShift.startTime.toDate();
    upcomingShift.endTime = upcomingShift.endTime.toDate();
    return upcomingShift;
}

export async function createNewCall(uid: string): Promise<any> {
    let timeStamp = new Date();
    const docRef = await callsRef.add({
        userId: uid,
        callStart: timeStamp,
        arrived: null,
        treated: null,
        transported: null,
        completed: null,
    });

    return docRef.id;
}

export async function updateCall(docId: string, sequenceStep: string): Promise<any> {
    let timeStamp = new Date();
    
    if (sequenceStep === 's1') {
        await callsRef.doc(docId).update({arrived: timeStamp}) 
    } else if (sequenceStep === 's2') {
        await callsRef.doc(docId).update({treated: timeStamp}) 
    } else if (sequenceStep === 's3') {
        await callsRef.doc(docId).update({transported: timeStamp}) 
    } else if (sequenceStep === 's4') {
        await callsRef.doc(docId).update({completed: timeStamp}) 
    } 
}


export async function updateUsername(uid: string, newName: string): Promise<any> {
    usersRef.doc(uid).update({
        fullName: newName,
    })
}

export async function updateRank(uid: string, newRank: string): Promise<any> {
    usersRef.doc(uid).update({
        rank: newRank,
    })
}

export async function updateYear(uid: string, newYear: Number): Promise<any> {
    usersRef.doc(uid).update({
        gradYear: newYear,
    })
}

export async function updatePushToken(uid: string, newToken: string): Promise<any>  {
    await usersRef.doc(uid).update({
        pushToken: newToken,
    })
}


// TODO: get N next shiftss

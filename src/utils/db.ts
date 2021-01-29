import { firebase } from './firebaseConfig';
import { User, Shift} from '../constants/collectionTypes';

const firestore = firebase.firestore();
const usersRef = firestore.collection('users');
const shiftsRef = firestore.collection('shifts');
const callsRef = firestore.collection('calls');

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

export async function getShifts(uid: string): Promise<any> {
    //TODO: Error handling
    const firestoreShiftsDocument: any = await shiftsRef.doc(uid).get();
    return;
    // TODO
}

export async function getUserShifts(uid: string): Promise<any> {
    const listShifts: any[] = [];
    await shiftsRef
        .where("userID", "==", uid)
        .orderBy("startTime", "asc")
        .onSnapshot(
            querySnapshot => {
              querySnapshot.forEach(doc => {
                listShifts.push(doc.data())
                // TODO: convert data types
              });
            },
            error => {
              console.log(error)
            }
        )
    console.log(listShifts)
    return listShifts;
}

export async function getMonthlyHours(uid: string): Promise<any> {
    const listShifts: Shift[] = await getUserShifts(uid);
    const now = Date()
    let monthlyHours = 0.0;
    console.log("Getting monthly hours")
    console.log(listShifts.length)
    listShifts.forEach(shift => {
        console.log("For each")
        const shiftStartDate = shift.startTime
        const shiftEndDate = shift.endTime
        if (shift.endTime < now && shift.endTime.getMonth() == now.getMonth() && shift.endTime.getYear() == now.getYear() ) {
            monthlyHours += (shiftEndDate.getTime() - shiftStartDate.getTime()) / (1000 * 60 * 60)
        }
    });
    return monthlyHours;
}

export async function getNextShift(uid: string): Promise<any> {
    const listShifts: Shift[] = await getUserShifts(uid);
    const now = Date()
    let curNextShift = null;
    listShifts.forEach(shift => {
        console.log("For each")
        const shiftStartDate = shift.startTime
        if (now <= shiftStartDate && ((curNextShift == null) || shiftStartDate < curNextShift)) {
            curNextShift = shiftStartDate
        }
    });
    return curNextShift;
}

// TODO: get N next shiftss

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


import { firebase } from './firebaseConfig';
import { User, Shift, Call} from '../constants/collectionTypes';

const firestore = firebase.firestore();
const usersRef = firestore.collection('users');
const shiftsRef = firestore.collection('shifts');
const callsRef = firestore.collection('calls');
const contactsRef = firestore.collection('contacts');
const formsRef = firestore.collection('forms');
const whitelistRef = firestore.collection('userWhitelist');


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
    const snapshot: any = await shiftsRef.where("memberIds", "array-contains", uid).orderBy("start", "asc").get();
    const data: any = snapshot.docs.map(doc => doc.data());
    data.forEach(doc => doc.start = doc.start.toDate());
    data.forEach(doc => doc.end = doc.end.toDate());
    return data;
}

export async function getShiftsForDay(date: Date): Promise<any> {
    var inputDate = new Date(date);

    let month = inputDate.getMonth()
    let day = inputDate.getUTCDate()
    let year = inputDate.getFullYear()

    const dayStart = new Date(year, month, day, 0, 0, 0);
    const dayEnd = new Date(year, month, day+1, 0, 0, 0);
    const snapshot: any = await shiftsRef
        .orderBy("start", "asc")
        .startAt(dayStart)
        .endAt(dayEnd)
        .get();
    const data: any = snapshot.docs.map(doc => doc.data());
    data.forEach(doc => doc.start = doc.start.toDate());
    data.forEach(doc => doc.end = doc.end.toDate());
    return data;
}

export async function getAllShifts(): Promise<any> {
    const snapshot: any = await shiftsRef.orderBy("start", "asc").get();
    const data: any = snapshot.docs.map(doc => doc.data());
    data.forEach(doc => doc.start = doc.start.toDate());
    data.forEach(doc => doc.end = doc.end.toDate());
    return data;
}


export async function getContacts(): Promise<any> {
    const contacts: any = await contactsRef.orderBy("name", "asc").get();
    const data: any = contacts.docs.map(doc => doc.data());
    return data;
}

export async function getForms(userRank: string): Promise<any> {
    const forms: any = await formsRef.where('availableForRanks', 'array-contains', userRank).get();
    return forms.docs.map(doc => doc.data());
}

export async function getMonthlyHours(uid: string): Promise<any> {
    const listShifts: Shift[] = await getUserShifts(uid);
    const now = new Date()
    let monthlyHours = 0.0;
    listShifts.forEach(shift => {
        const shiftStartDate = shift.start
        const shiftEndDate = shift.end
        if (shift.end < now && shift.end.getMonth() == now.getMonth() && shift.end.getFullYear() == now.getFullYear() ) {
            monthlyHours += (shiftEndDate.getTime() - shiftStartDate.getTime()) / (1000 * 60 * 60)
        }
    });
    return monthlyHours;
}

export async function getNextShift(uid: string): Promise<any> {
    const currTime = new Date();
    const snapshot: any = await shiftsRef
        .where("memberIds", "array-contains", uid)
        .orderBy("start", "asc")
        .startAt(currTime)
        .get();
    let upcomingShift: Shift = snapshot.docs[0].data();
    upcomingShift.start = upcomingShift.start.toDate();
    upcomingShift.end = upcomingShift.end.toDate();
    return upcomingShift;
}

export async function createNewCall(uid: string): Promise<any> {
    let timeStamp = new Date();
    const call: Call = {
        userID: uid,
        dispatched: timeStamp,
        onScene: null,
        tranScene: null,
        completed: null,
    }
    const docRef = await callsRef.add(call);

    return docRef.id;
}

export async function updateCall(docId: string, sequenceStep: number): Promise<any> {
    let timeStamp = new Date();
    
    if (sequenceStep === 0) {
        await callsRef.doc(docId).update({onScene: timeStamp}) 
    } else if (sequenceStep === 1) {
        await callsRef.doc(docId).update({tranScene: timeStamp}) 
    } else if (sequenceStep === 2) {
        await callsRef.doc(docId).update({completed: timeStamp}) 
    }
}

export async function getUserCalls(uid: string): Promise<any> {
    const snapshot: any = await callsRef
        .where("userID", "==", uid)
        .orderBy("dispatched", "desc")
        .limit(10)
        .get();
    const data: any = snapshot.docs.map(doc => doc.data());
    data.forEach(doc => doc.completed = doc.completed.toDate());
    data.forEach(doc => doc.dispatched = doc.dispatched.toDate());
    data.forEach(doc => doc.onScene = doc.onScene.toDate());
    data.forEach(doc => doc.tranScene = doc.tranScene.toDate());
    return data;
}

export async function deleteCall(docId: string): Promise<any> {
    await callsRef.doc(docId).delete();
}


export async function getLatestCall(uid: string): Promise<any> {
    const snapshot: any = await callsRef
        .where("userID", "==", uid)
        .orderBy("dispatched", "desc")
        .limit(1)
        .get();
    let latestCall: any = snapshot.docs[0].data();
    latestCall.dispatched = latestCall.dispatched.toDate();
    latestCall.onScene = latestCall.onScene.toDate();
    latestCall.tranScene = latestCall.tranScene.toDate();
    latestCall.completed = latestCall.completed.toDate();
    return latestCall;
}

export function updateUsername(uid: string, newName: string): void {
    usersRef.doc(uid).update({
        fullName: newName,
    })
}

export async function updateDateJoined(uid: string, newJoined: string): Promise<any> {
    usersRef.doc(uid).update({
        dateJoinedMERT: newJoined,
    })
}

export function updateYear(uid: string, newYear: Number): void {
    usersRef.doc(uid).update({
        gradYear: newYear,
    })
}

export async function updatePic(uid: string, newPic: string): Promise<any> {
    usersRef.doc(uid).update({
        profileImagePath: newPic,
    })
}

export async function getStorageImage(path: string, defaultImage: string): Promise<string> {
    const ref = firebase.storage().ref(path);
    let image = defaultImage
    await ref.getDownloadURL().then((data: string) => {
        image = data
    }).catch((error: any) => {
    })
    return image
}


export async function updatePushToken(uid: string, newToken: string): Promise<any>  {
    await usersRef.doc(uid).update({
        pushToken: newToken,
    })
}


// TODO: get N next shiftss

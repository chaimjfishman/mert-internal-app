import { firebase } from './firebaseConfig';
import { User, Shift} from '../constants/collectionTypes';

const firestore = firebase.firestore();
const usersRef = firestore.collection('users');
const shiftsRef = firestore.collection('shifts');

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

// TODO: get N next shifts

export async function updateUsername(uid: string, newName: string): Promise<any> {
    usersRef.doc(uid).set({
        id: uid,
        fullName: newName,
    })
    return;
}

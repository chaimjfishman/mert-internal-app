import { firebase } from './firebaseConfig';

const auth = firebase.auth();

export async function signUp(email: string, password: string): Promise<any> {
    //TODO: Error handling
    const response: any = await auth.createUserWithEmailAndPassword(email, password);
    const uid: string = response.user.uid;
    return uid;
}

export async function passwordReset(email: string): Promise<any> {
    return auth.sendPasswordResetEmail(email)
}


export async function loginWithEmail(email: string, password: string): Promise<any> {
    //TODO: Error handling
    const response: any = await auth.signInWithEmailAndPassword(email, password);
    const uid: string = response.user.uid;
    return uid;
}

export async function logout(): Promise<any> {
    //TODO: Error handling
    await auth.signOut();
}


export async function authStateListener(): Promise<any> {
    //TODO: 
}





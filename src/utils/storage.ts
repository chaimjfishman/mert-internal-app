import { firebase } from './firebaseConfig';

const storage = firebase.storage();

const protocolRef = storage.refFromURL("gs://mert-app-5ce19.appspot.com/2021 PA BLS Protocols FINAL 9-1-21.pdf");

export async function getPAProtocol(): Promise<any>{
    const PAProtocol = await protocolRef.getMetadata();
   return PAProtocol;
}
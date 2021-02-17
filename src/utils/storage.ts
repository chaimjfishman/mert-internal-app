import { firebase } from './firebaseConfig';

const storage = firebase.storage();

const protocolRef = storage.refFromURL("gs://mert-internal-app.appspot.com/forms/2020 PA BLS Protocols.pdf");

export async function getPAProtocol(): Promise<any>{
    const PAProtocol = await protocolRef.getMetadata();
    console.log(PAProtocol);
   return PAProtocol;
}
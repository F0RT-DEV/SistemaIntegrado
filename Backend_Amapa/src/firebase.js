import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Inicialização do Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Se necessário, adicione projectId, storageBucket, etc.
  });
}

const db = getFirestore();
export { db };

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Inicialização do Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Se necessário, adicione projectId, storageBucket, etc.
  });
}

const db = getFirestore();
export { db };

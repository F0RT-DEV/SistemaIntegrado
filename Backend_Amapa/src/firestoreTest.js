import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = getFirestore();

async function testFirestore() {
  try {
    const snapshot = await db.collection('test_collection').get();
    console.log('Conexão OK! Documentos encontrados:', snapshot.size);
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error('Erro ao conectar Firestore:', error);
  }
}

// Executa o teste
await testFirestore();

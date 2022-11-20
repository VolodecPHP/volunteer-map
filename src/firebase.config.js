import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB0rxitVk1KViiJNo81zpzL9N11iTIUgpg',
	authDomain: 'volunteer-map-2.firebaseapp.com',
	projectId: 'volunteer-map-2',
	storageBucket: 'volunteer-map-2.appspot.com',
	messagingSenderId: '941830477150',
	appId: '1:941830477150:web:759dd4bc158dc1aa936bcf',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDKHtQEIvyH0-npwOgUEkeCHRshXYl4mK8',
	authDomain: 'volonteer-map.firebaseapp.com',
	projectId: 'volonteer-map',
	storageBucket: 'volonteer-map.appspot.com',
	messagingSenderId: '1046054218517',
	appId: '1:1046054218517:web:c1bc4eae427d05dfec171c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

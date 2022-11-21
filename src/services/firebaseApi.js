import {
	collection,
	doc,
	addDoc,
	deleteDoc,
	updateDoc,
	query,
	where,
	getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const MARKERS_COLLECTION = 'markers';

export const MARK_TYPES = {
	I_NEED: 'I_NEED',
	I_HAVE: 'I_HAVE',
};

export const useApiClient = () => {
	const addMarker = async (data) => {
		try {
			await addDoc(collection(db, MARKERS_COLLECTION), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const removeMarker = async (id) => {
		const q = query(collection(db, MARKERS_COLLECTION), where('id', '==', id));
		const docs = await await getDocs(q);

		docs.forEach(async (d) => {
			await deleteDoc(doc(db, MARKERS_COLLECTION, d.id));
		});
	};

	const updateMarker = async (id, data) => {
		const q = query(collection(db, MARKERS_COLLECTION), where('id', '==', id));
		const docs = await await getDocs(q);

		docs.forEach(async (d) => {
			await updateDoc(doc(db, MARKERS_COLLECTION, d.id), data);
		});
	};

	const getAllMarkers = async () => {
		// return [
		// 	{
		// 		id: '1',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Один',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.458516,
		// 			lng: 30.508254,
		// 		},
		// 	},
		// 	{
		// 		id: '2',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Другий допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.460541,
		// 			lng: 30.541304,
		// 		},
		// 	},
		// 	{
		// 		id: '3',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Третій допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.434151,
		// 			lng: 30.691758,
		// 		},
		// 	},
		// 	{
		// 		id: '4',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'один',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.562263,
		// 			lng: 30.746979,
		// 		},
		// 	},
		// 	{
		// 		id: '5',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Пятий допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.557571,
		// 			lng: 30.389028,
		// 		},
		// 	},
		// 	{
		// 		id: '6',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Шостий допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 50.331727,
		// 			lng: 30.4784,
		// 		},
		// 	},
		// 	{
		// 		id: '7',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'чверть',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 49.842425,
		// 			lng: 24.012524,
		// 		},
		// 	},
		// 	{
		// 		id: '8',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Восьмий допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 49.835536,
		// 			lng: 24.026381,
		// 		},
		// 	},
		// 	{
		// 		id: '9',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Девятий допис',
		// 		items: [
		// 			{
		// 				name: 'унікальне',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 49.857225,
		// 			lng: 24.03779,
		// 		},
		// 	},
		// 	{
		// 		id: '10',
		// 		type: MARK_TYPES.I_NEED,
		// 		ownerName: 'Володимир Мурин',
		// 		ownerId: 'someId',
		// 		location: 'Львів, вулиця Городоцька(біля скрині)',
		// 		contactInfo: 'Телефон: +380978373363',
		// 		creationDate: Date.now(),
		// 		description: 'Потрібні планшети і готівка для Н бригади',
		// 		notes: 'До планшетів було б дуже добре мати зарядку',
		// 		keyWords: 'Десятий допис',
		// 		items: [
		// 			{
		// 				name: 'Планшети',
		// 				quantity: '5 штук',
		// 			},
		// 			{
		// 				name: 'Готівка',
		// 				quantity: '10 000 грн',
		// 			},
		// 		],
		// 		markerLocation: {
		// 			lat: 49.823107,
		// 			lng: 24.041314,
		// 		},
		// 	},
		// ];

		let res = [];
		const querySnapshot = await getDocs(collection(db, MARKERS_COLLECTION));

		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});

		return res;
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(getAuth(), email, password)
			.then((userCredential) => {
				return {
					user: userCredential,
					error: null,
				};
			})
			.catch((error) => {
				return {
					user: null,
					error: error,
				};
			});
	};

	const register = async (email, password) => {
		return createUserWithEmailAndPassword(getAuth(), email, password)
			.then((userCredential) => {
				return {
					user: userCredential,
					error: null,
				};
			})
			.catch((error) => {
				return {
					user: null,
					error: error,
				};
			});
	};

	const saveUsetToLocalStorage = (uuid) => {
		localStorage.setItem('hash-volunteer-map-uuid', uuid);
		localStorage.setItem('hash-volunteer-map-is-auth', true);
	};

	const getUuidFromLocalStorage = () => {
		return localStorage.getItem('hash-volunteer-map-uuid');
	};

	const getIsAuthFromLocalStorage = () => {
		return JSON.parse(localStorage.getItem('hash-volunteer-map-is-auth'));
	};

	return {
		addMarker,
		removeMarker,
		updateMarker,
		getAllMarkers,
		login,
		register,
		saveUsetToLocalStorage,
		getUuidFromLocalStorage,
		getIsAuthFromLocalStorage,
	};
};

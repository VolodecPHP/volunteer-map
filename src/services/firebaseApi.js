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

const DOTS_COLLECTION = 'dots';
const MARKERS_COLLECTION = 'markers';

export const useApiClient = () => {
	const addDot = async (data) => {
		try {
			await addDoc(collection(db, DOTS_COLLECTION), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const removeDot = async (id) => {
		await deleteDoc(doc(db, DOTS_COLLECTION, id));
	};

	const removeDotByMarkerId = async (markerId) => {
		const q = query(
			collection(db, DOTS_COLLECTION),
			where('marker_id', '==', markerId)
		);
		const docs = await await getDocs(q);

		docs.forEach(async (d) => {
			await deleteDoc(doc(db, DOTS_COLLECTION, d.id));
		});
	};

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
		let res = [];
		const querySnapshot = await getDocs(collection(db, MARKERS_COLLECTION));

		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});

		return res;
	};

	const getAllDots = async () => {
		let res = [];
		const querySnapshot = await getDocs(collection(db, DOTS_COLLECTION));

		querySnapshot.forEach((doc) => {
			res.push(doc.data());
		});

		return res;
	};

	return {
		addDot,
		removeDot,
		addMarker,
		removeMarker,
		updateMarker,
		removeDotByMarkerId,
		getAllMarkers,
		getAllDots,
	};
};

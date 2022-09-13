import { useState } from 'react';
import { MARKERS_DATA } from '../mock-data';

const loadInfoService = () => {
	return new Promise((res) => {
		setTimeout(
			() => res(MARKERS_DATA.find((marker) => marker.id === '2')),
			500
		);
	});
};

const useInfoModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalCoords, setModalCoords] = useState({
		x: 0,
		y: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [details, setdetails] = useState({
		keyWords: '',
	});

	const openModalWithCoords = async (coords) => {
		setIsOpen(true);
		setIsLoading(true);
		setModalCoords(coords);

		try {
			const details = await loadInfoService();

			setdetails(details);
		} catch {
			setdetails('Something went wrong');
		}

		setIsLoading(false);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		isLoading,
		modalCoords,
		details,
		openModalWithCoords,
		closeModal,
	};
};

export { useInfoModal };

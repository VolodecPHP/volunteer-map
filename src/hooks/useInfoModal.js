import { useState } from 'react';

const useInfoModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalCoords, setModalCoords] = useState({
		x: 0,
		y: 0,
	});
	const [details, setdetails] = useState({
		keyWords: '',
	});

	const openModalWithCoords = async (coords, details) => {
		console.log('I AM OPENING', coords, details);
		setIsOpen(true);
		setdetails(details);
		setModalCoords(coords);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		modalCoords,
		details,
		openModalWithCoords,
		closeModal,
	};
};

export { useInfoModal };

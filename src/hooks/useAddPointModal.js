import { useState } from 'react';

const useAddPointModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [xy, setXy] = useState({
		x: 0,
		y: 0,
	});

	const [cords, setCords] = useState({
		lat: 0,
		lng: 0,
	});

	const openModal = (coords, domEventCords) => {
		setCords(coords);
		setXy(domEventCords);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		cords,
		xy,
		closeModal,
		openModal,
	};
};

export { useAddPointModal };

import { useState } from 'react';

const useDetailsModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = async () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		closeModal,
		openModal,
	};
};

export { useDetailsModal };

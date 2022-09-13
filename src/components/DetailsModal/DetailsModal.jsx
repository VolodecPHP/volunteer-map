import './DetailsModal.styles.css';

const DetailsModal = ({ isOpen, closeHandler, details }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className='details-modal'>
			{JSON.stringify(details)}
			<button onClick={closeHandler}>close</button>
		</div>
	);
};

export { DetailsModal };

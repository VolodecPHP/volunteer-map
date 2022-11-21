import './AddPointModal.styles.css';

const AddPointModal = ({ isOpen, closeHandler, openAddMarker, coords }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			className='add-point-modal'
			style={{
				left: coords.x,
				top: coords.y,
			}}
		>
			<button
				onClick={() => {
					openAddMarker();
					closeHandler();
				}}
			>
				Add point here
			</button>
			<button onClick={closeHandler}>Close</button>
		</div>
	);
};

export { AddPointModal };

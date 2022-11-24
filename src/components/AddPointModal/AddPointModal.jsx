import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

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
			<Button
				onClick={() => {
					openAddMarker();
					closeHandler();
				}}
			>
				Add point here
			</Button>
			<CloseButton onClick={closeHandler} />
		</div>
	);
};

export { AddPointModal };

import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import { useApiClient } from '../../services/firebaseApi';

import './InfoModal.styles.css';

const DEFAULT_CORDS = {
	x: '50%',
	y: '50%',
};

const InfoModal = ({
	isOpen,
	infoText,
	closeHandler,
	coords,
	textClickHandler,
	ownerId,
	openEdit,
}) => {
	const { getUuidFromLocalStorage } = useApiClient();

	if (!isOpen) {
		return null;
	}

	const ownerFromLocaleStorage = getUuidFromLocalStorage();
	const isOwner = ownerFromLocaleStorage === ownerId;

	return (
		<div
			className='info-modal'
			style={{
				left: coords.x || DEFAULT_CORDS.x,
				top: coords.y || DEFAULT_CORDS.y,
			}}
		>
			<Button onClick={textClickHandler}>Check</Button>
			{isOwner && (
				<Button
					variant='warning'
					onClick={() => {
						openEdit();
						closeHandler();
					}}
				>
					Edit
				</Button>
			)}
			<CloseButton onClick={closeHandler} />
		</div>
	);
};

export { InfoModal };

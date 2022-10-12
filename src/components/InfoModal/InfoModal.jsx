import './InfoModal.styles.css';

const DEFAULT_CORDS = {
	x: '50%',
	y: '50%',
};

const InfoModal = ({
	isOpen,
	infoText,
	isLoading,
	closeHandler,
	coords,
	textClickHandler,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			className='info-modal'
			style={{
				left: coords.x || DEFAULT_CORDS.x,
				top: coords.y || DEFAULT_CORDS.y,
			}}
		>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<button onClick={textClickHandler}>{infoText}</button>
			)}
			<button onClick={closeHandler}>X</button>
		</div>
	);
};

export { InfoModal };
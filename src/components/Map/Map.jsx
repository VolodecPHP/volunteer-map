import {
	GoogleMap,
	LoadScript,
	MarkerF,
	CircleF,
} from '@react-google-maps/api';
import { useMapInstance } from '../../hooks/useMapInstance';
import { API_KEY } from '../../models/googleMaps';
import okIcon from '../../icon.png';
import {
	loadDefaultCenterCoords,
	loadDefaultZoom,
	setDefaultCenterCoords,
	setDefaultZoom,
} from '../../services/googleMap';
import { useInfoModal } from '../../hooks/useInfoModal';
import { InfoModal } from '../InfoModal/InfoModal';
import { DetailsModal } from '../DetailsModal/DetailsModal';
import { useDetailsModal } from '../../hooks/useDetailsModal';
import { DOTS } from '../../mock-data';
import { useState } from 'react';
import './Map.styles.css';
import { useFeatureToggles } from '../../hooks/useFeatureToggles';

const center = loadDefaultCenterCoords();
const zoom = loadDefaultZoom();

const Map = () => {
	const { mapInstance, InfoCollector } = useMapInstance();
	const {
		isOpen: isInfoModalOpen,
		isLoading: isInfoModalLoading,
		closeModal: closeInfoModal,
		modalCoords,
		details,
		openModalWithCoords,
	} = useInfoModal();
	const {
		isOpen: isDetailsModalOpen,
		closeModal: closeDetailsModal,
		openModal: openDetailsModal,
	} = useDetailsModal();
	const [dynamicCenterCoords, setDynamicCenterCoords] = useState(center);
	const circleToggle = useFeatureToggles('showCircle');

	const onDragEndHandler = () => {
		if (mapInstance) {
			setDefaultCenterCoords({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	const onZoomHandler = () => {
		if (mapInstance) {
			setDefaultZoom(mapInstance.zoom);

			circleToggle.onValid(() =>
				setDynamicCenterCoords({
					lat: mapInstance.center.lat(),
					lng: mapInstance.center.lng(),
				})
			);
		}

		closeInfoModal();
	};

	const onDragHandler = () => {
		if (mapInstance) {
			circleToggle.onValid(() =>
				setDynamicCenterCoords({
					lat: mapInstance.center.lat(),
					lng: mapInstance.center.lng(),
				})
			);
		}

		closeInfoModal();
	};

	const onClickMarkerHandler = (e) => {
		openModalWithCoords({
			x: e.domEvent.clientX - e.domEvent.layerX,
			y: e.domEvent.clientY - e.domEvent.offsetY,
		});
	};

	const options = {
		strokeColor: '#222',
		strokeOpacity: 0.5,
		strokeWeight: 2,
		fillColor: '#f7f7f7',
		fillOpacity: 0.1,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		radius: 30000,
		zIndex: 100,
	};

	return (
		<LoadScript googleMapsApiKey={API_KEY}>
			<div className='map-wrapper'>
				<GoogleMap
					mapContainerStyle={{
						width: '100%',
						height: 'calc(100vh - 50px)',
					}}
					center={center}
					zoom={zoom}
					onDragEnd={onDragEndHandler}
					onZoomChanged={onZoomHandler}
					onDrag={onDragHandler}
				>
					{circleToggle.value && (
						<CircleF center={dynamicCenterCoords} options={options} />
					)}
					{DOTS.map((dot) => (
						<MarkerF
							position={dot.location}
							icon={okIcon}
							onClick={onClickMarkerHandler}
							key={dot.marker_id}
						/>
					))}
					<InfoCollector />
				</GoogleMap>
			</div>
			<InfoModal
				isOpen={isInfoModalOpen}
				isLoading={isInfoModalLoading}
				infoText={details.keyWords}
				closeHandler={closeInfoModal}
				coords={modalCoords}
				textClickHandler={openDetailsModal}
			/>
			<DetailsModal
				isOpen={isDetailsModalOpen}
				closeHandler={closeDetailsModal}
				details={details}
			/>
		</LoadScript>
	);
};

export { Map };

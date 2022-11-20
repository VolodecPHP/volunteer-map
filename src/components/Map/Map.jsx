import {
	GoogleMap,
	LoadScript,
	MarkerF,
	CircleF,
} from '@react-google-maps/api';
import { useMapInstance } from '../../hooks/useMapInstance';
import { API_KEY } from '../../models/googleMaps';
import I_NEED_ICON from '../../I_NEED.png';
import I_HAVE_ICON from '../../I_HAVE.png';
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
import { useState } from 'react';
import './Map.styles.css';
import { useFeatureToggles } from '../../hooks/useFeatureToggles';
import { AddPointModal } from '../AddPointModal/AddPointModal';
import { useAddPointModal } from '../../hooks/useAddPointModal';
import { useEffect } from 'react';
import { useApiClient } from '../../services/firebaseApi';

const center = loadDefaultCenterCoords();
const zoom = loadDefaultZoom();

const Map = ({ openAddPointWithCords, markers, setMarkers }) => {
	const { mapInstance, InfoCollector } = useMapInstance();
	const {
		isOpen: isInfoModalOpen,
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
	const {
		isOpen: isAddPointModalOpen,
		openModal: openAddPointModal,
		closeModal: closeAddPointModal,
		cords: addMarkerCords,
		xy,
	} = useAddPointModal();
	const { getAllMarkers } = useApiClient();

	useEffect(() => {
		Promise.all([getAllMarkers()]).then((r) => {
			setMarkers(r[0]);
		});
	}, []);

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
		closeAddPointModal();
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
		closeAddPointModal();
	};

	const onClickMarkerHandler = (e, details) => {
		openModalWithCoords(
			{
				x: e.domEvent.clientX - e.domEvent.layerX,
				y: e.domEvent.clientY - e.domEvent.offsetY,
			},
			details
		);
	};

	const onAddPointHandler = (e) => {
		openAddPointModal(
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
			},
			{
				x: e.domEvent.clientX,
				y: e.domEvent.clientY,
			}
		);
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
					onClick={onAddPointHandler}
				>
					{circleToggle.value && (
						<CircleF center={dynamicCenterCoords} options={options} />
					)}
					{markers.map((marker) => (
						<MarkerF
							position={marker.markerLocation}
							icon={marker.type === 'I_NEED' ? I_NEED_ICON : I_HAVE_ICON}
							onClick={(e) => onClickMarkerHandler(e, marker)}
							key={marker.id}
						/>
					))}
					<InfoCollector />
				</GoogleMap>
			</div>
			<InfoModal
				isOpen={isInfoModalOpen}
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
			<AddPointModal
				isOpen={isAddPointModalOpen}
				closeHandler={closeAddPointModal}
				openAddMarker={() => openAddPointWithCords(addMarkerCords)}
				coords={xy}
			/>
		</LoadScript>
	);
};

export { Map };

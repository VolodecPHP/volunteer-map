const INITIAL_CENTER = {
	lat: 49.842701,
	lng: 24.028223,
};

const INITIAL_ZOOM = 12;

export const loadDefaultCenterCoords = () => {
	const center = localStorage.getItem('volunteer-map-center-coords');

	return JSON.parse(center) || INITIAL_CENTER;
};

export const setDefaultCenterCoords = (coords) => {
	localStorage.setItem('volunteer-map-center-coords', JSON.stringify(coords));
};

export const loadDefaultZoom = () => {
	const zoom = localStorage.getItem('volunteer-map-zoom');

	return JSON.parse(zoom) || INITIAL_ZOOM;
};

export const setDefaultZoom = (zoom) => {
	localStorage.setItem('volunteer-map-zoom', zoom);
};

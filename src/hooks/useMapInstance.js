import { useEffect, useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';

const useMapInstance = () => {
	const [mapInstance, setMapInstance] = useState(null);

	// NOTE: To use mapInstance InfoCollector component should be nested inside <GoogleMap>!!!
	const InfoCollector = () => {
		const map = useGoogleMap();

		useEffect(() => {
			if (map) {
				setMapInstance(map);
			}
		}, [map]);

		return null;
	};

	return {
		mapInstance,
		InfoCollector,
	};
};

export { useMapInstance };

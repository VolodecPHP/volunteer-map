import { useState } from 'react';
import { defaultToggleStates } from '../models/toggles';
import { useApiClient } from '../services/firebaseApi';
import { FeatureTogglesContext } from './FeatureTogglesContext';
import { Header } from './Header/Header';
import { Map } from './Map/Map';

function App() {
	const [toggles, setToggles] = useState(defaultToggleStates);

	const api = useApiClient();

	window.firebaseApi = api;

	return (
		<div className='App'>
			<FeatureTogglesContext.Provider value={{ toggles, setToggles }}>
				<Header />
				<Map />
			</FeatureTogglesContext.Provider>
		</div>
	);
}

export default App;

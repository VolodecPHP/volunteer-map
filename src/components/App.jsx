import { useMemo } from 'react';
import { useState } from 'react';
import { defaultToggleStates } from '../models/toggles';
import { useApiClient } from '../services/firebaseApi';
import { AddPoint } from './AddPoint/AddPoint';
import { AuthPage } from './AuthPage/AuthPage';
import { FeatureTogglesContext } from './FeatureTogglesContext';
import { FilterPanel } from './FilterPanel/FilterPanel';
import { Header } from './Header/Header';
import { Map } from './Map/Map';

function App() {
	const [toggles, setToggles] = useState(defaultToggleStates);
	const [showAuthPage, setShowAuthPage] = useState(false);
	const [showAddPoint, setShowAddPoint] = useState(false);
	const [showFilterPanel, setShowFilterPanel] = useState(false);
	const [addPointCords, setAddPointCords] = useState({
		lat: 0,
		lng: 0,
	});
	const api = useApiClient();

	const [markers, setMarkers] = useState([]);
	const [filterParam, setFilterParam] = useState('');
	const [defaultPointValues, setDefaulPointValues] = useState({});
	const [addPointMethod, setAddPointMethod] = useState('add');

	const openAddPointWithCords = (cords, defaultValues, method = 'add') => {
		setShowAddPoint(true);
		setAddPointCords(cords);
		setDefaulPointValues(defaultValues);
		setAddPointMethod(method);
	};

	const filteredMarkers = useMemo(
		() =>
			markers.filter((marker) => {
				return JSON.stringify(marker)
					.toUpperCase()
					.includes(filterParam.toUpperCase());
			}),
		[filterParam, markers]
	);
	window.firebaseApi = api;

	return (
		<div className='App'>
			<FeatureTogglesContext.Provider value={{ toggles, setToggles }}>
				<Header
					setIsAuthPage={setShowAuthPage}
					openFilter={() => setShowFilterPanel(true)}
				/>
				{showFilterPanel && (
					<FilterPanel
						close={() => setShowFilterPanel(false)}
						filterParam={filterParam}
						setFilterParam={setFilterParam}
						markers={filteredMarkers}
					/>
				)}
				{showAuthPage && <AuthPage setIsAuthPage={setShowAuthPage} />}
				{showAddPoint && (
					<AddPoint
						setAddPointCords={setAddPointCords}
						cords={addPointCords}
						closeAddPoint={() => setShowAddPoint(false)}
						setMarkers={setMarkers}
						defaultValues={defaultPointValues}
						action={addPointMethod}
					/>
				)}
				<Map
					openAddPointWithCords={openAddPointWithCords}
					markers={filteredMarkers}
					setMarkers={setMarkers}
				/>
			</FeatureTogglesContext.Provider>
		</div>
	);
}

export default App;

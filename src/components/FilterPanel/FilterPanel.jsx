import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './FilterPanel.styles.css';

const FilterPanel = ({
	showFilterPanel,
	close,
	filterParam,
	setFilterParam,
	markers,
}) => {
	return (
		<section
			className={`filter-panel filter-panel--${
				showFilterPanel ? 'show' : 'hide'
			}`}
		>
			<div className='filter-panel__input'>
				<Form.Control
					type='text'
					placeholder='Filter places by keyword'
					onChange={(e) => setFilterParam(e.target.value)}
					value={filterParam}
				/>
				<CloseButton onClick={close} />
			</div>
			<div>
				{markers.map((marker) => (
					<div key={marker.id}>
						<hr />
						<div>
							<b>Description:</b> {marker.description}
						</div>
						<div>
							<b>Owner:</b> {marker.ownerName}
						</div>
						<div>
							<b>Location:</b> {marker.location}
						</div>
						<div>
							<b>Key Words:</b> {marker.keyWords}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export { FilterPanel };

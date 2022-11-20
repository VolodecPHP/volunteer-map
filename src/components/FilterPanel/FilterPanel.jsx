import './FilterPanel.styles.css';

const FilterPanel = ({ close, filterParam, setFilterParam, markers }) => {
	return (
		<section className='filter-panel'>
			<label>
				<input
					type='text'
					onChange={(e) => setFilterParam(e.target.value)}
					value={filterParam}
				/>
				<button onClick={close}>close</button>
			</label>
			<div>
				{markers.map((marker) => (
					<div key={marker.id}>
						<div>{marker.description}</div>
						<div>{marker.ownerName}</div>
						<div>{marker.location}</div>
						<div>{marker.keyWords}</div>
						<br />
						<hr />
						<br />
					</div>
				))}
			</div>
		</section>
	);
};

export { FilterPanel };

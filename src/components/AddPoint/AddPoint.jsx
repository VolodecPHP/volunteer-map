import { useState } from 'react';
import { MARK_TYPES, useApiClient } from '../../services/firebaseApi';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const AddPoint = ({ cords, closeAddPoint }) => {
	const [dot, setDot] = useState({
		lat: cords.lat,
		lng: cords.lng,
	});

	const {
		getIsAuthFromLocalStorage,
		addDot,
		addMarker,
		getUuidFromLocalStorage,
	} = useApiClient();

	useEffect(() => {
		setDot({
			lat: cords.lat,
			lng: cords.lng,
		});
	}, [cords]);

	const [marker, setMarker] = useState({
		type: MARK_TYPES.I_NEED,
		ownerName: '',
		location: '',
		contactInfo: '',
		description: '',
		notes: '',
		keyWords: '',
		items: [],
	});

	const changeItemNameById = (id, name) => {
		setMarker({
			...marker,
			items: marker.items.map((el) => {
				if (el.id === id) {
					return {
						...el,
						name: name,
					};
				}

				return el;
			}),
		});
	};

	const changeItemQuantityById = (id, quantity) => {
		setMarker({
			...marker,
			items: marker.items.map((el) => {
				if (el.id === id) {
					return {
						...el,
						quantity: quantity,
					};
				}

				return el;
			}),
		});
	};

	if (!getIsAuthFromLocalStorage()) {
		return (
			<section>
				<h1>You should login first!</h1>
			</section>
		);
	}

	const submitHandler = async () => {
		const userId = getUuidFromLocalStorage();
		const markerId = uuidv4();

		await addDot({
			marker_id: markerId,
			location: dot,
			type: marker.type,
		});

		await addMarker({
			...marker,
			id: markerId,
			ownerId: userId,
			creationDate: Date.now(),
		});

		closeAddPoint();
	};

	return (
		<section>
			<h1>Add point</h1>
			<br />
			<label>
				Coords
				<input
					type='text'
					value={dot.lat}
					onChange={(e) => setDot({ ...dot, lat: e.target.value })}
				/>
				<input
					type='text'
					value={dot.lng}
					onChange={(e) => setDot({ ...dot, lng: e.target.value })}
				/>
			</label>
			<br />
			<label>
				Type:
				<select
					value={marker.type}
					onChange={(e) => setMarker({ ...marker, type: e.target.value })}
				>
					<option value={MARK_TYPES.I_HAVE}>I have this items</option>
					<option value={MARK_TYPES.I_NEED}>I need this items</option>
				</select>
			</label>
			<br />
			<label>
				Your name:
				<input
					type='text'
					value={marker.ownerName}
					required
					onChange={(e) => setMarker({ ...marker, ownerName: e.target.value })}
				/>
			</label>
			<br />
			<label>
				Describe your location more precisely:
				<input
					type='text'
					value={marker.location}
					required
					onChange={(e) => setMarker({ ...marker, location: e.target.value })}
				/>
			</label>
			<br />
			<label>
				Ways how to reach you(email, phone...)
				<input
					type='text'
					value={marker.contactInfo}
					onChange={(e) =>
						setMarker({ ...marker, contactInfo: e.target.value })
					}
				/>
			</label>
			<br />
			<label>
				Small description
				<textarea
					value={marker.description}
					onChange={(e) =>
						setMarker({ ...marker, description: e.target.value })
					}
				/>
			</label>
			<br />
			<label>
				Notes
				<textarea
					value={marker.notes}
					onChange={(e) => setMarker({ ...marker, notes: e.target.value })}
				/>
			</label>
			<br />
			<label>
				Key words(to easily find your spot by search)
				<input
					type='text'
					value={marker.keyWords}
					onChange={(e) => setMarker({ ...marker, keyWords: e.target.value })}
				/>
			</label>
			<br />
			<div>
				Items:
				{marker.items.map((item) => (
					<label key={item.id}>
						<br />
						<input
							type='text'
							value={
								marker.items.find((element) => element.id === item.id).name
							}
							onChange={(e) => changeItemNameById(item.id, e.target.value)}
						/>
						<input
							type='text'
							value={
								marker.items.find((element) => element.id === item.id).quantity
							}
							onChange={(e) => changeItemQuantityById(item.id, e.target.value)}
						/>
						<button
							onClick={() => {
								setMarker({
									...marker,
									items: marker.items.filter(
										(element) => element.id !== item.id
									),
								});
							}}
						>
							delete
						</button>
					</label>
				))}
				<br />
				<button
					onClick={() =>
						setMarker({
							...marker,
							items: [
								...marker.items,
								{
									id: uuidv4(),
									name: '',
									quantity: '',
								},
							],
						})
					}
				>
					Add item
				</button>
			</div>
			<button onClick={submitHandler}>Add point</button>
			<button onClick={closeAddPoint}>close</button>
		</section>
	);
};

export { AddPoint };

import { useState } from 'react';
import { MARK_TYPES, useApiClient } from '../../services/firebaseApi';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const AddPoint = ({
	showAddPoint,
	cords,
	closeAddPoint,
	setMarkers: setMarkersFromApp,
	defaultValues,
	action,
}) => {
	const {
		getIsAuthFromLocalStorage,
		addMarker,
		getUuidFromLocalStorage,
		updateMarker,
		removeMarker,
	} = useApiClient();

	const [marker, setMarker] = useState({
		type: MARK_TYPES.I_NEED,
		ownerName: '',
		location: '',
		contactInfo: '',
		description: '',
		notes: '',
		keyWords: '',
		items: [],
		markerLocation: {
			lat: cords.lat,
			lng: cords.lng,
		},
		...defaultValues,
	});

	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(`${action} point`);
	}, [action]);

	useEffect(() => {
		setMarker({
			...marker,
			markerLocation: {
				lat: cords.lat,
				lng: cords.lng,
			},
		});
	}, [cords]);

	useEffect(() => {
		if (defaultValues) {
			setMarker({
				...marker,
				defaultValues,
			});
		}
	}, [defaultValues]);

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
		const markerToAdd = {
			...marker,
			id: uuidv4(),
			ownerId: getUuidFromLocalStorage(),
			creationDate: Date.now(),
		};

		await addMarker(markerToAdd);

		setMarkersFromApp((value) => [...value, markerToAdd]);
		closeAddPoint();
	};

	const updatePointHandler = async () => {
		await updateMarker(marker.id, marker);

		setMarkersFromApp((value) =>
			value.map((item) => {
				if (item.id === marker.id) {
					return marker;
				}

				return item;
			})
		);
		closeAddPoint();
	};

	const deletePointHandler = async () => {
		await removeMarker(marker.id);

		if (window.confirm('Are your sure you want to delete this point?')) {
			setMarkersFromApp((values) =>
				values.filter(({ id }) => id !== marker.id)
			);
			closeAddPoint();
		}
	};

	return (
		<Modal
			aria-labelledby='contained-modal-title-vcenter'
			centered
			scrollable
			backdrop='static'
			keyboard={false}
			size='lg'
			show={showAddPoint}
			onHide={closeAddPoint}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<b className='text-capitalize'>{title}</b>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Row>
					<Form.Group
						as={Col}
						md={6}
						className='mb-3'
						controlId='formCoordsLat'
					>
						<Form.Label>Lat</Form.Label>
						<Form.Control
							type='number'
							required
							placeholder='Lat'
							aria-describedby='inputGroupPrepend'
							value={marker.markerLocation ? marker.markerLocation.lat : ''}
							onChange={(e) =>
								setMarker({
									...marker,
									markerLocation: {
										...marker.markerLocation,
										lat: e.target.value,
									},
								})
							}
						/>
					</Form.Group>

					<Form.Group
						as={Col}
						md={6}
						className='mb-3'
						controlId='formCoordsLng'
					>
						<Form.Label>Lng</Form.Label>
						<Form.Control
							type='number'
							required
							placeholder='Lng'
							aria-describedby='inputGroupPrepend'
							value={marker.markerLocation ? marker.markerLocation.lng : ''}
							onChange={(e) =>
								setMarker({
									...marker,
									markerLocation: {
										...marker.markerLocation,
										lng: e.target.value,
									},
								})
							}
						/>
					</Form.Group>
				</Row>

				<Form.Group className='mb-3' controlId='formSelect'>
					<Form.Label>Type</Form.Label>
					<Form.Select
						value={marker.type}
						onChange={(e) => setMarker({ ...marker, type: e.target.value })}
					>
						<option value={MARK_TYPES.I_HAVE}>I have this items</option>
						<option value={MARK_TYPES.I_NEED}>I need this items</option>
					</Form.Select>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formName'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your name'
						value={marker.ownerName}
						required
						onChange={(e) =>
							setMarker({ ...marker, ownerName: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formLocation'>
					<Form.Label>Location</Form.Label>
					<Form.Control
						type='text'
						as='textarea'
						placeholder='Describe your location more precisely'
						value={marker.location}
						required
						onChange={(e) => setMarker({ ...marker, location: e.target.value })}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formContacts'>
					<Form.Label>Contacts</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ways how to reach you (email, phone...)'
						value={marker.contactInfo}
						onChange={(e) =>
							setMarker({ ...marker, contactInfo: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formDescription'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						type='text'
						as='textarea'
						placeholder='Small description'
						value={marker.description}
						onChange={(e) =>
							setMarker({ ...marker, description: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formNotes'>
					<Form.Label>Notes</Form.Label>
					<Form.Control
						type='text'
						as='textarea'
						placeholder='Put some notes here'
						value={marker.notes}
						onChange={(e) => setMarker({ ...marker, notes: e.target.value })}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formKeywords'>
					<Form.Label>Key words</Form.Label>
					<Form.Control
						type='text'
						placeholder='Key words (to easily find your spot by search)'
						value={marker.keyWords}
						onChange={(e) => setMarker({ ...marker, keyWords: e.target.value })}
					/>
				</Form.Group>

				{marker.items && (
					<Form.Group className='mb-3' controlId='formItems'>
						<Form.Label>Items:</Form.Label>
						{marker.items.map((item) => (
							<Row key={item.id} className='align-items-end mb-3'>
								<Form.Group as={Col} md={5} controlId='formKeywords'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										required
										value={
											marker.items.find((element) => element.id === item.id)
												.name
										}
										onChange={(e) =>
											changeItemNameById(item.id, e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group as={Col} md={5} controlId='formKeywords'>
									<Form.Label>Quantity</Form.Label>
									<Form.Control
										type='number'
										required
										min={1}
										max={100000}
										value={
											marker.items.find((element) => element.id === item.id)
												.quantity
										}
										onChange={(e) =>
											changeItemQuantityById(item.id, e.target.value)
										}
									/>
								</Form.Group>
								<Col md={2}>
									<Button
										variant='danger'
										onClick={() => {
											setMarker({
												...marker,
												items: marker.items.filter(
													(element) => element.id !== item.id
												),
											});
										}}
									>
										Remove
									</Button>
								</Col>
							</Row>
						))}

						<Button
							className='d-block mt-1'
							variant='success'
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
						</Button>
					</Form.Group>
				)}
			</Modal.Body>

			<Modal.Footer>
				{action === 'update' && (
					<Button variant='danger' onClick={deletePointHandler}>
						Delete point
					</Button>
				)}
				{action === 'add' && (
					<Button variant='primary' onClick={submitHandler}>
						Add point
					</Button>
				)}
				{action === 'update' && (
					<Button variant='primary' onClick={updatePointHandler}>
						Update point
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export { AddPoint };

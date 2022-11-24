import './AuthPage.styles.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useApiClient } from '../../services/firebaseApi';
import { useEffect } from 'react';
const AuthPage = ({ showAuthPage, setIsAuthPage }) => {
	const { login, register, saveUsetToLocalStorage } = useApiClient();

	const [error, setError] = useState('');

	useEffect(() => {
		if (!showAuthPage && error) {
			setError('');
		}
	}, [error, showAuthPage]);

	const [isLoginMethod, setIsLoginMethod] = useState(true);
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const title = isLoginMethod ? 'Login' : 'Register';
	const changeMethodTitle = isLoginMethod
		? 'Do not have an account?'
		: 'Already have an account?';

	const authMethod = isLoginMethod ? login : register;

	const auth = async () => {
		const result = await authMethod(user.email, user.password);

		if (result.error) {
			setError(result.error.message);
			return;
		}

		saveUsetToLocalStorage(result.user.user.uid);
		setIsAuthPage(false);
	};

	return (
		<Modal
			aria-labelledby='contained-modal-title-vcenter'
			centered
			backdrop='static'
			keyboard={false}
			show={showAuthPage}
			onHide={() => setIsAuthPage(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<b>{title}</b>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>E-mail</Form.Label>
					<Form.Control
						type='email'
						required
						placeholder='Enter email'
						aria-describedby='inputGroupPrepend'
						onChange={(e) => {
							setUser({ ...user, email: e.target.value });
						}}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type='password'
						placeholder='Password'
						onChange={(e) => {
							setUser({ ...user, password: e.target.value });
						}}
					/>
				</Form.Group>
				{error && <div>{error}</div>}
			</Modal.Body>
			<Modal.Footer>
				<div className='d-flex w-100 flex-column justify-content-center align-items-center'>
					<Button
						className='w-100 mb-1'
						variant='primary'
						onClick={() => auth()}
					>
						Continue
					</Button>
					<a href='#' onClick={() => setIsLoginMethod(!isLoginMethod)}>
						{changeMethodTitle}
					</a>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export { AuthPage };

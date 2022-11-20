import { useState } from 'react';
import { useApiClient } from '../../services/firebaseApi';
const AuthPage = ({ setIsAuthPage }) => {
	const { login, register, saveUsetToLocalStorage } = useApiClient();

	const [isLoginMethod, setIsLoginMethod] = useState(true);
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

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
		<section>
			<h1>{title}</h1>
			<label>
				Email
				<input
					type='email'
					onChange={(e) => {
						setUser({ ...user, email: e.target.value });
					}}
				/>
			</label>
			<label>
				Password
				<input
					type='password'
					onChange={(e) => {
						setUser({ ...user, password: e.target.value });
					}}
				/>
			</label>
			<button onClick={() => auth()}>{title}</button>
			<button onClick={() => setIsLoginMethod(!isLoginMethod)}>
				{changeMethodTitle}
			</button>
			<div>{error}</div>
		</section>
	);
};

export { AuthPage };

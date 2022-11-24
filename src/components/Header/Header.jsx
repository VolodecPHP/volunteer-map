import './Header.styles.css';
import Button from 'react-bootstrap/Button';

const Header = ({ setIsAuthPage, openFilter }) => {
	return (
		<header className='header'>
			<Button variant='primary' onClick={openFilter}>
				Filters
			</Button>
			<Button
				variant='success'
				onClick={() => setIsAuthPage((value) => !value)}
			>
				Login
			</Button>
		</header>
	);
};

export { Header };

import './Header.styles.css';

const Header = ({ setIsAuthPage, openFilter }) => {
	return (
		<header className='header'>
			<button onClick={() => setIsAuthPage((value) => !value)}>Login</button>
			<button onClick={openFilter}>open filter panel</button>
		</header>
	);
};

export { Header };

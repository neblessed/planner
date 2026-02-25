import { NavLink } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';

const links = [
	{ path: '/', title: 'Встречи' },
	{ path: '/users', title: 'Клиенты' },
	{ path: '/123', title: 'Аналитика' },
];

function Header() {
	const [selected, setSelected] = useState('/');

	return (
		<div className="header">
			<div className="header_container">
				<a className="header_container__main_page_img" href="/">
					<img src="./main-icon.png" />
				</a>
				{links.map((link, index) => (
					<NavLink
						className={`header_container__link ${selected === link.path ? 'header_container__link_selected' : ''}`}
						key={index}
						to={link.path}
						onClick={() => setSelected(link.path)}
					>
						{link.title}
					</NavLink>
				))}
			</div>
		</div>
	);
}

export default Header;

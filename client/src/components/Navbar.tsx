import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.png';

interface MenuItemLink {
  name: string;
  link: string;
}

interface MenuItemAction {
  name: string;
  onClick: () => void;
}

type MenuItem = MenuItemLink | MenuItemAction;

interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  const renderMenuItem = (item: MenuItem, index: number) => {
    if ('onClick' in item) {
      return (
        <li key={index} className="nav-item active">
          <button className="nav-link btn btn-link text-light font-weight-bold" onClick={item.onClick}>
            {item.name}
          </button>
        </li>
      );
    } else {
      return (
        <li key={index} className="nav-item active">
          <Link className="nav-link text-light font-weight-bold" to={item.link}>
            {item.name} <span className="sr-only">(current)</span>
          </Link>
        </li>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <img src={Logo} alt="Logo" height={50} width={50} className="mr-2" />
        <span className="navbar-brand text-light">MANUSH Tech</span>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

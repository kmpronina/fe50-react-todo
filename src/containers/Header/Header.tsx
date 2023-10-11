import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { HeaderStyled } from './Header-styled.ts';

const Header = () => {
  const links = [
    {
      id: 1,
      href: ROUTES.HOME,
      children: 'Home',
    },
    {
      id: 2,
      href: ROUTES.TODO,
      children: 'ToDo',
    },
  ];

  return (
    <HeaderStyled>
      {links.map(({ id, href, children }) => (
        <NavLink key={id} to={href}>
          {children}
        </NavLink>
      ))}
    </HeaderStyled>
  );
};
export default Header;

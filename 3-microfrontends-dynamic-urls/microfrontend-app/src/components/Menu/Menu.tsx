import { FC } from 'react';
import { IMenuProps } from './Menu.interfaces';
import { Link } from 'react-router-dom';
import classes from './Menu.module.scss';

export const Menu: FC<IMenuProps> = ({ basePath }) => {
  return (
    <div className={classes.menu}>
      <h4>MicrofrontendApp Menu</h4>

      <nav className={classes.nav}>
        <Link to={basePath}>Main MF Page</Link>

        <Link to={`${basePath}/second`}>Second MF Page</Link>

        <Link to={`${basePath}/third`}>Third MF Page</Link>
      </nav>
    </div>
  );
};

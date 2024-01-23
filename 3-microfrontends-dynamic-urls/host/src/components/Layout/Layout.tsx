import { Link, Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';

export const Layout = () => {
  return (
    <div>
      <div className={classes.menu}>
        <h3 className={classes.heading}>HOST Menu</h3>

        <nav className={classes.nav}>
          <Link to={'/'}>Main HOST Page</Link>

          <Link to={'/contacts'}>Contacts HOST Page</Link>

          <Link to={'/microfrontend-app'}>Remote Module</Link>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

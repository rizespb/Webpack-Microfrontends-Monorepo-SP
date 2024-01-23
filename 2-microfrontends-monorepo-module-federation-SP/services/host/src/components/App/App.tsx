import { Link, Outlet } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import { adminRoutes } from '@packages/shared/src/routes/admin';

export const App = () => {
  return (
    <div data-testid="App.DataTestId">
      <h1>HOST PAGE</h1>

      <Link to={adminRoutes.about}>ABOUT</Link>
      <br />
      <Link to="/shop">SHOP</Link>
      <br />
      <Link to={shopRoutes.main}>SHOP MAIN</Link>
      <br />
      <Link to={shopRoutes.second}>SHOP SECOND PAGE</Link>

      <Outlet />
    </div>
  );
};

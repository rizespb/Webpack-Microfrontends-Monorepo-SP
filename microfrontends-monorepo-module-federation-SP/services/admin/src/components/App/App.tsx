import { Link, Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-testid="App.DataTestId">
      <h1>PAGE</h1>

      <Link to="/about">ABOUT</Link>
      <br />
      <Link to="/shop">SHOP</Link>

      <Outlet />
    </div>
  );
};

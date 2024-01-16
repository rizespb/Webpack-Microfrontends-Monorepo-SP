import { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '@/pages/About/About';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';

// TREE SHAKING
function TODO() {
  console.log('TODO_FUNCTION');
}

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  TODO();

  if (__PLATFORM__ === 'desktop') {
    return <div>DESKTOP PLATFORM</div>;
  }

  if (__PLATFORM__ === 'mobile') {
    return <div>MOBILE PLATFORM</div>;
  }

  if (__ENV__ === 'development') {
    // ...some code
  }

  return (
    <div>
      <h1>PLATFROM = {__PLATFORM__}</h1>

      <div>
        <img src={avatarPng} alt="" />
        <img src={avatarJpg} alt="" />
      </div>

      <div>
        <Calendar className={classes.icon} width={500} height={500} />
      </div>

      <Link to={'/about'}>about</Link>
      <br />
      <Link to={'/shop'}>shop</Link>

      <h1 className={classes.value}>{count}</h1>

      <button className={classes.button} onClick={increment}>
        <span>inc</span>
      </button>

      <About />
    </div>
  );
};

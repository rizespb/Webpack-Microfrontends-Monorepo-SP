import { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '@/pages/About/About';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
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

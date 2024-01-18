import { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';

// TREE SHAKING
function TODO() {
  TODO2();
}
function TODO2() {
  throw new Error();
}

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    // setCount((prev) => prev + 1);

    // Пример для отслеживания стэк-трейса с помощью source-map
    TODO();
  };

  // TODO();

  // if (__PLATFORM__ === 'desktop') {
  //   return <div>DESKTOP PLATFORM</div>;
  // }

  // if (__PLATFORM__ === 'mobile') {
  //   return <div>MOBILE PLATFORM</div>;
  // }

  // if (__ENV__ === 'development') {
  //   // ...some code
  // }

  return (
    <div data-testid="App.DataTestId">
      <h1 data-testid="Platform.DataTestId">PLATFROM = {__PLATFORM__}</h1>

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

      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dolorem, aperiam itaque sint tempore,
        excepturi, facilis quod quam iste praesentium esse? Nihil distinctio repellat dicta inventore labore, deleniti
        voluptates expedita? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos fugit
        aliquid laboriosam tenetur voluptates tempora doloremque ipsam ratione perspiciatis assumenda, quam alias?
        Obcaecati iste libero ipsa, veniam odit debitis? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dolorem, aperiam itaque sint tempore,
        excepturi, facilis quod quam iste praesentium esse? Nihil distinctio repellat dicta inventore labore, deleniti
        voluptates expedita? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos fugit
        aliquid laboriosam tenetur voluptates tempora doloremque ipsam ratione perspiciatis assumenda, quam alias?
        Obcaecati iste libero ipsa, veniam odit debitis? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dolorem, aperiam itaque sint tempore,
        excepturi, facilis quod quam iste praesentium esse? Nihil distinctio repellat dicta inventore labore, deleniti
        voluptates expedita? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos fugit
        aliquid laboriosam tenetur voluptates tempora doloremque ipsam ratione perspiciatis assumenda, quam alias?
        Obcaecati iste libero ipsa, veniam odit debitis? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dolorem, aperiam itaque sint tempore,
        excepturi, facilis quod quam iste praesentium esse? Nihil distinctio repellat dicta inventore labore, deleniti
        voluptates expedita? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos fugit
        aliquid laboriosam tenetur voluptates tempora doloremque ipsam ratione perspiciatis assumenda, quam alias?
        Obcaecati iste libero ipsa, veniam odit debitis? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores dolorem, aperiam itaque sint tempore,
        excepturi, facilis quod quam iste praesentium esse? Nihil distinctio repellat dicta inventore labore, deleniti
        voluptates expedita? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dignissimos fugit
        aliquid laboriosam tenetur voluptates tempora doloremque ipsam ratione perspiciatis assumenda, quam alias?
        Obcaecati iste libero ipsa, veniam odit debitis? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
    </div>
  );
};

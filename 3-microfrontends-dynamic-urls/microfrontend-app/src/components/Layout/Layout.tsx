import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <h3 className={styles.heading}>MICRO-1 APP LAYOUT</h3>

      {children}
    </div>
  );
};

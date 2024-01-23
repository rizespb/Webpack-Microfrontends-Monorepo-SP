import { FC } from 'react';
import { Layout } from '../Layout';
import { Route, Routes } from 'react-router-dom';
import { IMicrofrontendAppProps } from './MicrofrontendApp.interfaces';
import { Menu } from '../Menu';

const MainMicrofrontendPage: FC = () => <>Content for Main ('/') page in MicrofrontendApp</>;
const SecondMicrofrontendPage: FC = () => <>Second Microfront Page</>;
const ThridMicrofrontendPage: FC = () => <>Thrid Microfront Page</>;

export const MicrofrontendApp: FC<IMicrofrontendAppProps> = ({ header, basePath }) => {
  console.log('MicrofrontendApp');
  return (
    <Layout>
      {header && <h1>{header}</h1>}

      <Menu basePath={basePath} />

      <Routes>
        <Route index={true} Component={MainMicrofrontendPage} />

        <Route path="second" Component={SecondMicrofrontendPage} />

        <Route path="third" Component={ThridMicrofrontendPage} />
      </Routes>
    </Layout>
  );
};

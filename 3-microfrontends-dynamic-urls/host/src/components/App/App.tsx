import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout';
import { MainPage } from '@/pages/MainPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MicrofrontendPage } from '@/pages/MicrofrontendPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route path="/" Component={MainPage} />

          <Route path="/contacts" Component={ContactsPage} />

          <Route path="/microfrontend-app/*" Component={MicrofrontendPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

import { createRoot } from 'react-dom/client';
import { MicrofrontendApp } from '@/components/MicrofrontendApp';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <MicrofrontendApp header={'Header for local development'} basePath="/" />
  </BrowserRouter>
);

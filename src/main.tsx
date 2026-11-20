import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const params = new URLSearchParams(window.location.search);
const inviteSlug = params.get('invite');

const App = lazy(() => import('./App'));
const Viewer = lazy(() => import('./Viewer'));

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-400 text-sm">
      Loading…
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Suspense fallback={<Fallback />}>
      {inviteSlug ? <Viewer slug={inviteSlug} /> : <App />}
    </Suspense>
  </StrictMode>
);

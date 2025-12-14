import './App.css'
import NavBar from './components/NavBar/NavBar';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const NewCampaign = lazy(() => import('./pages/NewCampaign/NewCampaign'));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new-campaign" element={<NewCampaign />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
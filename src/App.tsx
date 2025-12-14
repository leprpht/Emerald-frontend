import './App.css'
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router';
import MainPage from './pages/MainPage/MainPage';
import NewCampaign from './pages/NewCampaign/NewCampaign';
import EditCampaign from './pages/EditCampaign/EditCampaign';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new-campaign" element={<NewCampaign />} />
        <Route path="/edit-campaign/:id" element={<EditCampaign />} />
      </Routes>
    </>
  )
}

export default App
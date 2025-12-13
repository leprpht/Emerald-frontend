import { useEffect, useState } from 'react'
import { fetchCampaigns } from './services/api'
import type { Campaign } from './types/campaign'
import './App.css'
import NavBar from './components/NavBar/NavBar';
import Card from './components/Card/Card';

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      const data = await fetchCampaigns();
      setCampaigns(data);
      setLoading(false);
    };
    loadCampaigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </>
  )
}

export default App
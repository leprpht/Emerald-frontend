import { useEffect, useState } from 'react'
import { fetchCampaigns } from './services/api'
import type { Campaign } from './types/campaign'
import './App.css'

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      const data = await fetchCampaigns();
      setCampaigns(data);
      setLoading(false);
    };
    loadCampaigns();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Campaigns</h1>
        {campaigns.length === 0 ? (
          <p>No campaigns found</p>
        ) : (
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                {campaign.campaignName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
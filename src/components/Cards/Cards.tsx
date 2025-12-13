import { useEffect, useState } from 'react'
import { fetchCampaigns } from '../../services/api'
import './Cards.css';
import type { Campaign } from '../../types/campaign';
import Card from '../Card/Card';

export default function Cards() {
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
    <div className="cards-container">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
import type { Campaign } from '../../types/campaign';
import './Card.css';
import Keyword from '../Keyword/Keyword';

interface CardProps {
  campaign: Campaign;
}

export default function Card(data: CardProps) {
  return (
    <div className="card">
      <h3>{data.campaign.campaignName}</h3>
      {data.campaign.keywords.map((keyword) => (
        <Keyword text={keyword} />
      ))}
      <p>Bid Amount: ${data.campaign.bidAmount}</p>
      <p>Campaign Fund: ${data.campaign.campaignFund}</p>
      <p>Status: {data.campaign.status ? 'Active' : 'Paused'}</p>
      <p>Location: {data.campaign.town} (Radius: {data.campaign.radius} miles)</p>
    </div>
  );
}
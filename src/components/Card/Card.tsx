import type { Campaign } from '../../types/campaign';
import './Card.css';
import Keyword from '../Keyword/Keyword';
import x from '/src/assets/x-icon.svg';
import { deleteCampaign } from '../../services/api';

interface CardProps {
  campaign: Campaign;
}

export default function Card(data: CardProps) {

  function deleteThisCampaign() {
    deleteCampaign(data.campaign.id);
    window.location.reload();
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{data.campaign.campaignName}</h3>
        <a className='delete-button' onClick={deleteThisCampaign}>
          <img src={x}></img>
        </a>
      </div>
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
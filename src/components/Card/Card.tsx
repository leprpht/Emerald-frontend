import type { Campaign } from '../../types/campaign';
import './Card.css';
import Keyword from '../Keyword/Keyword';
import x from '/src/assets/x-icon.svg';
import edit from '/src/assets/pencil-icon.svg';
import { deleteCampaign } from '../../services/api';
import { useNavigate } from 'react-router';
import { styleNumbers } from '../../util/util';

interface CardProps {
  campaign: Campaign;
}

export default function Card(data: CardProps) {

  const nav = useNavigate();

  function deleteThisCampaign() {
    deleteCampaign(data.campaign.id);
    window.location.reload();
  }

  return (
    <div className="card">
      <h3>{data.campaign.campaignName}</h3>
      {data.campaign.keywords.map((keyword, index) => (
          <Keyword key={index} text={keyword} onRemove={() => {}} />
      ))}
      <p>Bid Amount: $ {styleNumbers(data.campaign.bidAmount)}</p>
      <p>Campaign Fund: $ {styleNumbers(data.campaign.campaignFund)}</p>
      <p>Status: {data.campaign.status ? 'Active' : 'Paused'}</p>
      <p>Location: {data.campaign.town}</p>
      <p>Radius: {data.campaign.radius} kilometers</p>
      <button className='delete-button' onClick={deleteThisCampaign}>
        <img src={x} alt="Delete" />
      </button>
      <button className='edit-button' onClick={() => nav(`/edit-campaign/${data.campaign.id}`)}>
        <img src={edit} alt="Edit" />
      </button>
    </div>
  );
}
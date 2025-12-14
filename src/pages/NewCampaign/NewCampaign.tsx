import { useState } from 'react';
import KeywordContainer from '../../components/KeywordContainer/KeywordContainer';
import './NewCampaign.css'
import towns from '../../data/townlist'
import { createCampaign } from '../../services/api';
import type { Campaign } from '../../types/campaign';
import { useNavigate } from 'react-router';

export default function NewCampaign() {
  const [radius, setRadius] = useState<number>(10);
  const [campaignName, setCampaignName] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [status, setStatus] = useState<string>('active');
  const [town, setTown] = useState<string>(towns[0]?.name || '');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const nav = useNavigate();

  async function handleCreateCampaign() {

    const missingFields: string[] = [];
    
    if (!campaignName.trim()) {
      missingFields.push('Campaign Name');
    }

    if (keywords.length === 0) {
      missingFields.push('Keywords');
    }

    if (bidAmount <= 0) {
      missingFields.push('Bid Amount');
    }

    if (budget <= 0) {
      missingFields.push('Campaign Budget');
    }

    if (!town) {
      missingFields.push('Campaign Target Town');
    }

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (budget < bidAmount) {
      setErrorMessage('Campaign Budget must be greater than or equal to Bid Amount.');
      return;
    }

    try {
      const newCampaign: Omit<Campaign, 'id'> = {
        campaignName,
        keywords,
        bidAmount,
        campaignFund: budget,
        status: status === 'active',
        town,
        radius
      };

      await createCampaign(newCampaign as Campaign);
      nav('/');
    } catch {
      setErrorMessage('Error creating campaign. Please try again.');
    }
  }

  return (
    <div className="new-campaign-container">
      <div className='new-campaign-card'>
        <h1>New Campaign</h1>
        {errorMessage && (
          <div className='error'>
            {errorMessage}
          </div>
        )}
        <div className='new-campaign-name'>
          <h3>Campaign Name</h3>
          <input type="text" placeholder='Enter campaign name...' value={campaignName} onChange={(e) => setCampaignName(e.target.value)}/>
        </div>
        <KeywordContainer keywords={keywords} onKeywordsChange={setKeywords} />
        <div className='new-campaign-bid-amount'>
          <h3>Bid Amount</h3>
          <input type="number" placeholder='Enter bid amount...' step="0.5" value={bidAmount || ''} onChange={(e) => setBidAmount(parseFloat(e.target.value) || 0)}/>
        </div>
        <div className='new-campaign-budget'>
          <h3>Campaign Budget</h3>
          <input type="number" placeholder='Enter campaign budget...' step="1"value={budget || ''} onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}/>
        </div>
        <div className='new-campaign-status'>
          <h3>Campaign Status</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <div className='new-campaign-town'>
          <h3>Campaign Target Town</h3>
          <select value={town} onChange={(e) => setTown(e.target.value)}>
            {towns.map((town) => (
              <option key={town.name} value={town.displayName}>{town.displayName}</option>
            ))}
          </select>
        </div>
        <div className='new-campaign-radius'>
          <h3>Campaign Target Radius: {radius} km</h3>
          <input type="range" min="1" max="100" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} />
        </div>
        <button className='create-campaign-button'onClick={handleCreateCampaign}>Create Campaign</button>
      </div>
    </div>
  );
}
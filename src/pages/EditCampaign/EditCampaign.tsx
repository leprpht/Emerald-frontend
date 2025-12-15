import { useEffect, useState } from 'react';
import KeywordContainer from '../../components/KeywordContainer/KeywordContainer';
import './EditCampaign.css'
import towns from '../../data/townlist'
import { updateCampaign, fetchCampaignById } from '../../services/api';
import type { Campaign } from '../../types/campaign';
import { useNavigate, useParams } from 'react-router';

export default function EditCampaign() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [radius, setRadius] = useState<number>(10);
  const [campaignName, setCampaignName] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [status, setStatus] = useState<string>('active');
  const [town, setTown] = useState<string>(towns[0]?.name || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const nav = useNavigate();

  useEffect(() => {
    async function loadCampaign() {
      if (!id) {
        setErrorMessage('No campaign ID provided');
        setLoading(false);
        return;
      }
      try {
        const fetchedCampaign = await fetchCampaignById(parseInt(id));
        setCampaign(fetchedCampaign);
        
        setCampaignName(fetchedCampaign.campaignName);
        setKeywords(fetchedCampaign.keywords);
        setBidAmount(fetchedCampaign.bidAmount);
        setBudget(fetchedCampaign.campaignFund);
        setStatus(fetchedCampaign.status ? 'active' : 'paused');
        setTown(fetchedCampaign.town);
        setRadius(fetchedCampaign.radius);
        
        setLoading(false);
      } catch (error) {
        setErrorMessage('Error loading campaign. Please try again.');
        setLoading(false);
        console.error(error);
      }
    }

    loadCampaign();
  }, [id]);

  async function handleEditCampaign() {
    if (!campaign) return;

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
      const updatedCampaign: Omit<Campaign, 'id'> = {
        campaignName,
        keywords,
        bidAmount,
        campaignFund: budget,
        status: status === 'active',
        town,
        radius
      };

      await updateCampaign(campaign.id, updatedCampaign as Campaign);
      nav('/');
    } catch {
      setErrorMessage('Error updating campaign. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="edit-campaign-container">
        <div className='edit-campaign-card'>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!campaign) {
    alert('Campaign not found');
    nav('/');
    return null;
  }

  return (
    <div className="edit-campaign-container">
      <div className='edit-campaign-card'>
        <h1>Edit Campaign</h1>
        {errorMessage && (
          <div className='error'>
            {errorMessage}
          </div>
        )}
        <div className='edit-campaign-name'>
          <h3>Campaign Name</h3>
          <input type="text" placeholder='Enter campaign name...' value={campaignName} onChange={(e) => setCampaignName(e.target.value)} defaultValue={campaign.campaignName}/>
        </div>
        <KeywordContainer keywords={keywords} onKeywordsChange={setKeywords} />
        <div className='edit-campaign-bid-amount'>
          <h3>Bid Amount</h3>
          <input type="number" placeholder='Enter bid amount...' step="0.5" value={bidAmount || ''} onChange={(e) => setBidAmount(parseFloat(e.target.value) || 0)} defaultValue={campaign.bidAmount}/>
        </div>
        <div className='edit-campaign-budget'>
          <h3>Campaign Budget</h3>
          <input type="number" placeholder='Enter campaign budget...' step="1"value={budget || ''} onChange={(e) => setBudget(parseFloat(e.target.value) || 0)} defaultValue={campaign.campaignFund}/>
        </div>
        <div className='edit-campaign-status'>
          <h3>Campaign Status</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)} defaultValue={campaign.status ? 'active' : 'paused'}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <div className='edit-campaign-town'>
          <h3>Campaign Target Town</h3>
          <select value={town} onChange={(e) => setTown(e.target.value)} defaultValue={campaign.town}>
            {towns.map((town) => (
              <option key={town.name} value={town.displayName}>{town.displayName}</option>
            ))}
          </select>
        </div>
        <div className='edit-campaign-radius'>
          <h3>Campaign Target Radius: {radius} km</h3>
          <input type="range" min="1" max="200" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} defaultValue={campaign.radius} />
        </div>
        <button className='edit-campaign-button'onClick={handleEditCampaign}>Save Changes</button>
      </div>
    </div>
  );
}
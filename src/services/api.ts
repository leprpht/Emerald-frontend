import type { Campaign } from '../types/campaign';
import axios from 'axios';

const url = 'http://localhost:8080/api';

export async function fetchCampaigns(): Promise<Campaign[]> {
    const response = await axios.get<Campaign[]>(`${url}/campaigns`);
    return response.data;
}

export async function fetchCampaignById(id: number): Promise<Campaign> {
    const response = await axios.get<Campaign>(`${url}/campaigns/${id}`);
    return response.data;
}

export async function createCampaign(campaign: Campaign): Promise<Campaign> {
    const response = await axios.post<Campaign>(`${url}/campaigns`, campaign);
    return response.data;
}

export async function updateCampaign(id: number, campaign: Campaign): Promise<Campaign> {
    const response = await axios.put<Campaign>(`${url}/campaigns/${id}`, campaign);
    return response.data;
}

export async function deleteCampaign(id: number): Promise<void> {
    await axios.delete(`${url}/campaigns/${id}`);
}

export async function fetchDemoAccountBalance(): Promise<number> {
    const response = await axios.get<number>(`${url}/balance`);
    return response.data;
}

export async function updateDemoAccountBalance(amount: number): Promise<void> {
    await axios.put(`${url}/balance?value=${amount}`);
}

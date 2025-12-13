export interface Campaign {
    id: number;
    campaignName: string;
    keywords: string[];
    bidAmount: number;
    campaignFund: number;
    status: boolean;
    town: string;
    radius: number;
}
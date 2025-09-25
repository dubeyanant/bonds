export interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: "Government" | "Corporate" | "Municipal";
  rating: string;
  ratingAgency: string;
  currentYield: number;
  faceValue: number;
  currentPrice: number;
  maturityDate: string;
  tenure: string;
  couponRate: number;
  minInvestment: number;
  isWatchlisted: boolean;
  riskLevel: "Low" | "Medium" | "High";
}

export type BondCategory = "short-tenure" | "high-rated" | "high-returns" | "government-bonds";

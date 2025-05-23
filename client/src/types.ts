export interface Bill {
  id: string;
  amount: number;
  date: string;
  vendorName: string;
}

export interface BillsResponse {
  bills: Bill[];
  errors?: string[];
} 
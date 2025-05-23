export interface Bill {
  id: string;
  amount: number;
  date: string;
  vendorName: string;
}

export interface BillInput {
  amount: number;
  date: string;
  vendorName: string;
}

export interface DeduplicationResult {
  bills: Bill[];
  duplicates: Bill[];
}

export interface UploadResponse {
  bills: Bill[];
  errors?: string[];
}

export interface FastifyFile {
  filename: string;
  file: Buffer;
} 
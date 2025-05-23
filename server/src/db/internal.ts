import { Bill } from "../types.js";
import { isVendorNameMatch } from '../utils/vendor-matcher.js';
import { v4 as uuidv4 } from 'uuid';

const bills: Bill[] = [];

export const getBills = () => bills;

export const addBill = ({ amount, date, vendorName }: { amount: number, date: string, vendorName: string }) => {
  const bill: Bill = {
    id: uuidv4(),
    amount,
    date,
    vendorName
  };
  bills.push(bill);
  return bill
}

export function findDuplicateBills(bill: { amount: number; date: string; vendorName: string }): boolean {
  // Get all bills with the same amount and date
  const potentialMatches = getBills().filter(
    existingBill =>
      existingBill.amount === bill.amount &&
      existingBill.date === bill.date
  );

  // Check if any of the potential matches have a matching vendor name
  return potentialMatches.some(
    existingBill => isVendorNameMatch(existingBill.vendorName, bill.vendorName)
  );
}
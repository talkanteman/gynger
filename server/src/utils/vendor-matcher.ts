/**
 * Checks if two vendor names match according to the specified rules:
 * 1. Exact match (case-insensitive)
 * 2. One extra letter
 * 3. One less letter
 * 4. One different letter
 */
export function isVendorNameMatch(name1: string, name2: string): boolean {
    // Convert both names to lowercase for case-insensitive comparison
    const n1 = name1.toLowerCase();
    const n2 = name2.toLowerCase();

    // Exact match (case-insensitive)
    if (n1 === n2) return true;

    // Check for one letter difference
    const len1 = n1.length;
    const len2 = n2.length;

    // If lengths differ by more than 1, they can't match
    if (Math.abs(len1 - len2) > 1) return false;

    // If lengths are equal, check for one different letter
    if (len1 === len2) {
        return sameLengthCheckForMissSpelling(n1, n2);
    }

    // If lengths differ by 1, check if one is a subset of the other
    const shorter = len1 < len2 ? n1 : n2;
    const longer = len1 < len2 ? n2 : n1;
    return oneLetterDifferenceCheck(shorter, longer)
}

function sameLengthCheckForMissSpelling(name1: string, name2: string): boolean {
    let differences = 0;
    for (let i = 0; i < name1.length; i++) {
        if (name1[i] !== name2[i]) differences++;
        if (differences > 1) return false;
    }
    return true;
}

function oneLetterDifferenceCheck(shortName: string, longName: string): boolean {
    let i = 0, j = 0;
    let differences = 0;

    while (i < shortName.length && j < longName.length) {
        if (shortName[i] === longName[j]) {
            i++;
            j++;
        } else {
            differences++;
            j++;
            if (differences > 1) return false;
        }
    }

    return true;
}
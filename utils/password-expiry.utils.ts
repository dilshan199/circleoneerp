export function generatePasswordExpiryDate(months: number = 6): Date {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);
    return expiry;
}
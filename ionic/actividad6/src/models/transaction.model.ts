export interface Transaction {
    id: string;
    customEntries: object[];
    items: object[];
    totalQuantity: number;
    subtotal: number;
    tax: number;
    tips: number;
    total: number;
    date: number;
}

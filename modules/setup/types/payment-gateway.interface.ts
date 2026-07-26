export interface PaymentGateway {
    pgs_id?: number;
    gateway_code?: string;
    gateway_name?: string;
    merchant_id?: string;
    api_key?: string;
    api_secret?: string;
    environment?: string;
    is_default?: boolean;
    gateway_status?: string;
}
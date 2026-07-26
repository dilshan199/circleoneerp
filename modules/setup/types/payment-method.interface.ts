export interface PaymentMethod {
    pm_id?: number;
    method_name?: string;
    method_code?: string;
    require_reference_no?: boolean;
    require_receipt_upload?: boolean;
    require_approval?: boolean;
    method_status?: string;
}
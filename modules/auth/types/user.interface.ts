export interface User
{
    user_id?: number;
    role_id: number;
    user_avater?: string;
    first_name: string;
    last_name: string;
    user_email: string;
    user_name: string;
    password: string;
    is_2fa_enabled?: boolean;
    password_expired_at: Date;
    account_status?: string;
}
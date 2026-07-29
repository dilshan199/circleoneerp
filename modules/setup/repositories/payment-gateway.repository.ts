import db from "@/lib/db_config";
import { PaymentGateway } from "../types/payment-gateway.interface";
import { RowDataPacket } from "mysql2";

export class PaymentGatewayRepository {

    // Fetch all payment gateways
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM payment_gateway_settings
             WHERE gateway_status != 'DELETED'
             ORDER BY pgs_id DESC`
        );
        return rows;
    }

    // Store new payment gateway
    static async store(paymentGateway: PaymentGateway) {
        const [result] = await db.query(
            `INSERT INTO payment_gateway_settings
            (
                gateway_code,
                gateway_name,
                merchant_id,
                api_key,
                api_secret,
                environment,
                is_default,
                gateway_status,
                created_at,
                updated_at
            )
            VALUES 
            (
                ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
            )`,
            [
                paymentGateway.gateway_code,
                paymentGateway.gateway_name,
                paymentGateway.merchant_id,
                paymentGateway.api_key,
                paymentGateway.api_secret,
                paymentGateway.environment ?? "SANDBOX",
                paymentGateway.is_default,
                paymentGateway.gateway_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch payment gateway by ID
    static async show(pgs_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_gateway_settings
             WHERE pgs_id = ?
             AND gateway_status != 'DELETED'`,
            [pgs_id]
        );
        return rows[0];
    }

    // Update payment gateway
    static async update(paymentGateway: PaymentGateway) {
        const [result] = await db.query(
            `UPDATE payment_gateway_settings
             SET
                gateway_code = ?,
                gateway_name = ?,
                merchant_id = ?,
                api_key = ?,
                api_secret = ?,
                environment = ?,
                is_default = ?,
                gateway_status = ?,
                updated_at = NOW()
             WHERE pgs_id = ?`,
            [
                paymentGateway.gateway_code,
                paymentGateway.gateway_name,
                paymentGateway.merchant_id,
                paymentGateway.api_key,
                paymentGateway.api_secret,
                paymentGateway.environment,
                paymentGateway.is_default,
                paymentGateway.gateway_status,
                paymentGateway.pgs_id
            ]
        );
        return result;
    }

    // Soft delete payment gateway
    static async delete(pgs_id: number) {
        const [result] = await db.query(
            `UPDATE payment_gateway_settings
             SET
                gateway_status = 'DELETED',
                updated_at = NOW()
             WHERE pgs_id = ?`,
            [pgs_id]
        );
        return result;
    }

    // Find payment gateway by code
    static async findByCode(gateway_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_gateway_settings
             WHERE gateway_code = ?
             AND gateway_status != 'DELETED'`,
            [gateway_code]
        );
        return rows[0];
    }

    // Find payment gateway by name
    static async findByName(gateway_name: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_gateway_settings
             WHERE gateway_name = ?
             AND gateway_status != 'DELETED'`,
            [gateway_name]
        );
        return rows[0];
    }

    // Get default payment gateway
    static async getDefault() {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_gateway_settings
             WHERE is_default = 1
             AND gateway_status = 'ACTIVE'
             LIMIT 1`
        );
        return rows[0];
    }
}
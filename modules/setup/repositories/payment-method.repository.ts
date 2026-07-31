import db from "@/lib/db_config";
import { PaymentMethod } from "../types/payment-method.interface";
import { RowDataPacket } from "mysql2";

export class PaymentMethodRepository {

    // Fetch all payment methods
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM payment_methods
             WHERE method_status != 'DELETED'
             ORDER BY pm_id DESC`
        );
        return rows;
    }

    // Store new payment method
    static async store(paymentMethod: PaymentMethod) {
        const [result] = await db.query(
            `INSERT INTO payment_methods
            (
                method_name,
                method_code,
                require_reference_no,
                require_receipt_upload,
                require_approval,
                method_status,
                created_at,
                updated_at
            )
            VALUES 
            (
                ?, ?, ?, ?, ?, ?, NOW(), NOW()
            )`,
            [
                paymentMethod.method_name,
                paymentMethod.method_code,
                paymentMethod.require_reference_no,
                paymentMethod.require_receipt_upload,
                paymentMethod.require_approval,
                paymentMethod.method_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch payment method by ID
    static async show(pm_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_methods
             WHERE pm_id = ?
             AND method_status != 'DELETED'`,
            [pm_id]
        );
        return rows[0];
    }

    // Update payment method
    static async update(paymentMethod: PaymentMethod) {
        const [result] = await db.query(
            `UPDATE payment_methods
             SET
                method_name = ?,
                method_code = ?,
                require_reference_no = ?,
                require_receipt_upload = ?,
                require_approval = ?,
                method_status = ?,
                updated_at = NOW()
             WHERE pm_id = ?`,
            [
                paymentMethod.method_name,
                paymentMethod.method_code,
                paymentMethod.require_reference_no,
                paymentMethod.require_receipt_upload,
                paymentMethod.require_approval,
                paymentMethod.method_status,
                paymentMethod.pm_id
            ]
        );
        return result;
    }

    // Soft delete payment method
    static async delete(pm_id: number) {
        const [result] = await db.query(
            `UPDATE payment_methods
             SET
                method_status = 'DELETED',
                updated_at = NOW()
             WHERE pm_id = ?`,
            [pm_id]
        );
        return result;
    }

    // Find payment method by code
    static async findByCode(method_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_methods
             WHERE method_code = ?
             AND method_status != 'DELETED'`,
            [method_code]
        );
        return rows[0];
    }

    // Find payment method by name
    static async findByName(method_name: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM payment_methods
             WHERE method_name = ?
             AND method_status != 'DELETED'`,
            [method_name]
        );
        return rows[0];
    }
}
import db from "@/lib/db_config";
import { TaxRate } from "../types/tax-rate.interface";
import { RowDataPacket } from "mysql2";


export class TaxRateRepository {

    // Fetch all tax rates
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM tax_rates
             WHERE tax_rate_status != 'DELETED'
             ORDER BY tax_rate_id DESC`
        );
        return rows;
    }

    // Store new tax rate
    static async store(taxRate: TaxRate) {
        const [result] = await db.query(
            `INSERT INTO tax_rates
            (
                tax_name,
                tax_code,
                tax_rate,
                tax_rate_status,
                created_at,
                updated_at
            )
            VALUES 
            (
                ?, ?, ?, ?, NOW(), NOW()
            )`,
            [
                taxRate.tax_name,
                taxRate.tax_code,
                taxRate.tax_rate,
                taxRate.tax_rate_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch tax rate by ID
    static async show(tax_rate_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM tax_rates
             WHERE tax_rate_id = ?
             AND tax_rate_status != 'DELETED'`,
            [tax_rate_id]
        );
        return rows[0];
    }

    // Update tax rate
    static async update(taxRate: TaxRate) {
        const [result] = await db.query(
            `UPDATE tax_rates
             SET
                tax_name = ?,
                tax_code = ?,
                tax_rate = ?,
                tax_rate_status = ?,
                updated_at = NOW()
             WHERE tax_rate_id = ?`,
            [
                taxRate.tax_name,
                taxRate.tax_code,
                taxRate.tax_rate,
                taxRate.tax_rate_status,
                taxRate.tax_rate_id
            ]
        );
        return result;
    }

    // Soft delete tax rate
    static async delete(tax_rate_id: number) {
        const [result] = await db.query(
            `UPDATE tax_rates
             SET
                tax_rate_status = 'DELETED',
                updated_at = NOW()
             WHERE tax_rate_id = ?`,
            [tax_rate_id]
        );
        return result;
    }

    // Find tax rate by code
    static async findByCode(tax_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM tax_rates
             WHERE tax_code = ?
            AND tax_rate_status != 'DELETED'`,
            [tax_code]
        );
        return rows[0];
    }

    // Find tax rate by name
    static async findByName(tax_name: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM tax_rates
             WHERE tax_name = ?
             AND tax_rate_status != 'DELETED'`,
            [tax_name]
        );
        return rows[0];
    }
}
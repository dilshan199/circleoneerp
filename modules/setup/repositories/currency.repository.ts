import db from "@/lib/db_config";
import { Currency } from "../types/currency.interface";
import { RowDataPacket } from "mysql2";

export class CurrencyRepository {

    // Fetch all currencies
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM currencies
             WHERE currency_status != 'DELETED'
             ORDER BY currency ASC`
        );
        return rows;
    }

    // Store a new currency
    static async store(currency: Currency) {
        const [result] = await db.query(
            `INSERT INTO currencies
            (
                currency_code,
                currency,
                currency_status,
                created_at,
                updated_at
            )
            VALUES
            (
                ?, ?, ?, NOW(), NOW()
            )`,
            [
                currency.currency_code,
                currency.currency,
                currency.currency_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch currency by ID
    static async show(currency_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM currencies
             WHERE currency_id = ?
             AND currency_status != 'DELETED'`,
            [currency_id]
        );
        return rows[0];
    }

    // Update currency
    static async update(currency: Currency) {
        const [result] = await db.query(
            `UPDATE currencies
             SET
                currency_code = ?,
                currency = ?,
                currency_status = ?,
                updated_at = NOW()
             WHERE currency_id = ?`,
            [
                currency.currency_code,
                currency.currency,
                currency.currency_status,
                currency.currency_id
            ]
        );
        return result;
    }

    // Soft delete currency
    static async delete(currency_id: number) {
        const [result] = await db.query(
            `UPDATE currencies
             SET
                currency_status = 'DELETED',
                updated_at = NOW()
             WHERE currency_id = ?`,
            [currency_id]
        );
        return result;
    }

    // Find currency by code
    static async findByCode(currency_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM currencies
             WHERE currency_code = ?
             AND currency_status != 'DELETED'`,
            [currency_code]
        );
        return rows[0];
    }

    // Find currency by name
    static async findByName(currency: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM currencies
             WHERE currency = ?
             AND currency_status != 'DELETED'`,
            [currency]
        );
        return rows[0];
    }
}
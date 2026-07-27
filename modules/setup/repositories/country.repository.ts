import db from "@/lib/db_config";
import { Country } from "../types/country.interface";
import { RowDataPacket } from "mysql2";

export class CountryRepository {

    // Fetch all countries
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM countries
             WHERE country_status != 'DELETED'
             ORDER BY country_name ASC`
        );
        return rows;
    }

    // Store a new country
    static async store(country: Country) {
        const [result] = await db.query(
            `INSERT INTO countries
            (
                country_code,
                country_name,
                country_status,
                created_at,
                updated_at
            )
            VALUES
            (
                ?, ?, ?, NOW(), NOW()
            )`,
            [
                country.country_code,
                country.country_name,
                country.country_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch country by ID
    static async show(country_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM countries
             WHERE country_id = ?
             AND country_status != 'DELETED'`,
            [country_id]
        );
        return rows[0];
    }

    // Update country
    static async update(country: Country) {
        const [result] = await db.query(
            `UPDATE countries
             SET
                country_code = ?,
                country_name = ?,
                country_status = ?,
                updated_at = NOW()
             WHERE country_id = ?`,
            [
                country.country_code,
                country.country_name,
                country.country_status,
                country.country_id
            ]
        );
        return result;
    }

    // Soft delete country
    static async delete(country_id: number) {
        const [result] = await db.query(
            `UPDATE countries
             SET
                country_status = 'DELETED',
                updated_at = NOW()
             WHERE country_id = ?`,
            [country_id]
        );
        return result;
    }

    // Find country by code
    static async findByCode(country_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM countries
             WHERE country_code = ?
             AND country_status != 'DELETED'`,
            [country_code]
        );
        return rows[0];
    }

    // Find country by name
    static async findByName(country_name: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM countries
             WHERE country_name = ?
             AND country_status != 'DELETED'`,
            [country_name]
        );
        return rows[0];
    }
}
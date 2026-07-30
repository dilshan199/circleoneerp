import db from "@/lib/db_config";
import { Feature } from "../types/feature.interface";
import { RowDataPacket } from "mysql2";

export class FeatureRepository {

    // Fetch all features
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM features
             WHERE feature_status != 'DELETED'
             ORDER BY feature_id DESC`
        );
        return rows;
    }

    // Store new feature
    static async store(feature: Feature) {
        const [result] = await db.query(
            `INSERT INTO features
            (
                feature_code,
                feature_name,
                description,
                feature_status,
                created_at,
                updated_at
            )
            VALUES 
            (
                ?, ?, ?, ?, NOW(), NOW()
            )`,
            [
                feature.feature_code,
                feature.feature_name,
                feature.description,
                feature.feature_status ?? "ACTIVE"
            ]
        );
        return result;
    }

    // Fetch feature by ID
    static async show(feature_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM features
             WHERE feature_id = ?
             AND feature_status != 'DELETED'`,
            [feature_id]
        );
        return rows[0];
    }

    // Update feature
    static async update(feature: Feature) {
        const [result] = await db.query(
            `UPDATE features
             SET
                feature_code = ?,
                feature_name = ?,
                description = ?,
                feature_status = ?,
                updated_at = NOW()
             WHERE feature_id = ?`,
            [
                feature.feature_code,
                feature.feature_name,
                feature.description,
                feature.feature_status,
                feature.feature_id
            ]
        );
        return result;
    }

    // Soft delete feature
    static async delete(feature_id: number) {
        const [result] = await db.query(
            `UPDATE features
             SET
                feature_status = 'DELETED',
                updated_at = NOW()
             WHERE feature_id = ?`,
            [feature_id]
        );
        return result;
    }

    // Find feature by code
    static async findByCode(feature_code: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM features
             WHERE feature_code = ?
             AND feature_status != 'DELETED'`,
            [feature_code]
        );
        return rows[0];
    }

    // Find feature by name
    static async findByName(feature_name: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM features
             WHERE feature_name = ?
             AND feature_status != 'DELETED'`,
            [feature_name]
        );
        return rows[0];
    }
}
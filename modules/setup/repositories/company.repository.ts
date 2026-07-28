import db from "@/lib/db_config";
import { Company } from "../types/company.interface";
import { RowDataPacket } from "mysql2";

export class CompanyRepository {

    // Get company details
    static async index() {
        const [rows] = await db.query(
            `SELECT *
             FROM companies
             ORDER BY company_id ASC`
        );
        return rows;
    }

    // Create company
    static async store(company: Company) {
        const [result] = await db.query(
            `INSERT INTO companies
            (
                company_logo,
                company_name,
                company_address,
                contact_land,
                contact_mobile,
                contact_whatsapp,
                contact_fax,
                company_email,
                register_number,
                tax_number,
                created_at,
                updated_at
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
            )`,
            [
                company.company_logo,
                company.company_name,
                company.company_address,
                company.contact_land,
                company.contact_mobile,
                company.contact_whatsapp,
                company.contact_fax,
                company.company_email,
                company.register_number,
                company.tax_number
            ]
        );
        return result;
    }

    // Get single company
    static async show(company_id: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM companies
             WHERE company_id = ?`,
            [company_id]
        );
        return rows[0];
    }

    // Update company
    static async update(company: Company) {
        const [result] = await db.query(
            `UPDATE companies
             SET
                company_logo = ?,
                company_name = ?,
                company_address = ?,
                contact_land = ?,
                contact_mobile = ?,
                contact_whatsapp = ?,
                contact_fax = ?,
                company_email = ?,
                register_number = ?,
                tax_number = ?,
                updated_at = NOW()
             WHERE company_id = ?`,
            [
                company.company_logo,
                company.company_name,
                company.company_address,
                company.contact_land,
                company.contact_mobile,
                company.contact_whatsapp,
                company.contact_fax,
                company.company_email,
                company.register_number,
                company.tax_number,
                company.company_id
            ]
        );
        return result;
    }

    // Find company by email
    static async findByEmail(company_email: string) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT *
             FROM companies
             WHERE company_email = ?`,
            [company_email]
        );
        return rows[0];
    }
}    
import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../types/company.interface";
import { CompanyValidator } from "../validators/company.validator";

export class CompanyService {

    // Fetch all companies
    static async index() {
        return await CompanyRepository.index();
    }

    // Store company
    static async store(company: Company) {

        // Validate request
        const validated = CompanyValidator.safeParse(company);
        if (!validated.success) {
            return {
                status: 400,
                message: validated.error.issues[0].message
            };
        }

        // Check duplicate email
        if (company.company_email) {
            const existingCompany = await CompanyRepository.findByEmail(
                company.company_email
            );
            if (existingCompany) {
                return {
                    status: 400,
                    message: "Company email already exists!"
                };
            }
        }
        return await CompanyRepository.store(company);
    }

    // Get single company
    static async show(company_id: number) {
        return await CompanyRepository.show(company_id);
    }

    // Update company
    static async update(company: Company) {

        // Validate request
        const validated = CompanyValidator.safeParse(company);
        if (!validated.success) {
            return {
                status: 400,
                message: validated.error.issues[0].message
            };
        }

        // Check duplicate email
        if (company.company_email) {
            const existingCompany = await CompanyRepository.findByEmail(
                company.company_email
            );
            if (
                existingCompany && existingCompany.company_id !== company.company_id
            ) {
                return {
                    status: 400,
                    message: "Company email already exists!"
                };
            }
        }
        return await CompanyRepository.update(company);
    }
}
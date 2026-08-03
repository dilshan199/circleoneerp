import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../types/company.interface";
import { CreateCompanyValidator, UpdateCompanyValidator } from "../validators/company.validator";

export class CompanyServices {

    // Fetch all companies
    static async indexServices() {
        const companies = await CompanyRepository.index();
        return companies;
    }

    // Store company
    static async storeServices(company: Company) {

        // Validate request
        const validation = CreateCompanyValidator.safeParse(company);
        if (!validation.success) {
            throw new Error(validation.error.issues[0].message);
        }

        // Check duplicate email
        if (company.company_email) {
            const existingCompany = await CompanyRepository.findByEmail(
                company.company_email
            );
            if (existingCompany) {
                throw new Error("Company email already exists!");
            }
        }
        const createdCompany = await CompanyRepository.store(company);
        return createdCompany;
    }

    // Get single company
    static async showServices(company_id: number) {
        const company = await CompanyRepository.show(company_id);
        return company;
    }

    // Update company
    static async updateServices(company: Company) {

        // Validate request
        const validation = UpdateCompanyValidator.safeParse(company);
        if (!validation.success) {
            throw new Error(validation.error.issues[0].message);
        }

        // Check duplicate email
        if (company.company_email) {
            const existingCompany = await CompanyRepository.findByEmail(
                company.company_email
            );
            if (
                existingCompany && existingCompany.company_id !== company.company_id
            ) {
                throw new Error("Company email already exists!");
            }
        }
        await CompanyRepository.update(company);
        return true;
    }
}
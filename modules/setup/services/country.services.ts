import { CountryRepository } from "../repositories/country.repository";
import { Country } from "../types/country.interface";
import { CreateCountryValidator, UpdateCountryValidator } from "../validators/country.validator";

export class CountryServices {

    // Fetch all countries
    static async indexServices() {
        const countries = await CountryRepository.index();
        return countries;
    }

    // Store country
    static async storeServices(country: Country) {

        // Validate request
        const validation = CreateCountryValidator.safeParse(country);
        if (!validation.success) {
            throw new Error(validation.error.issues[0].message);
        }

        // Check duplicate country code
        const existingCountryCode = await CountryRepository.findByCode(country.country_code!);
        if (existingCountryCode) {
            throw new Error("Country code already exists!");
        }

        // Check duplicate country name
        const existingCountryName = await CountryRepository.findByName(country.country_name!);
        if (existingCountryName) {
            throw new Error("Country name already exists!");
        }
        return await CountryRepository.store(country);
    }

    // Fetch single country
    static async showServices(country_id: number) {
        const country = await CountryRepository.show(country_id);
        return country;
    }

    // Update country
    static async updateServices(country: Country) {

        // Validate request
        const validation = UpdateCountryValidator.safeParse(country);
        if (!validation.success) {
            throw new Error(validation.error.issues[0].message);
        }

        // Check duplicate country code
        const existingCountryCode = await CountryRepository.findByCode(country.country_code!);
        if (
            existingCountryCode &&
            existingCountryCode.country_id !== country.country_id
        ) {
            throw new Error("Country code already exists!");
        }

        // Check duplicate country name
        const existingCountryName = await CountryRepository.findByName(country.country_name!);
        if (
            existingCountryName &&
            existingCountryName.country_id !== country.country_id
        ) {
            throw new Error("Country name already exists!");
        }
        await CountryRepository.update(country);
        return true;
    }

    // Soft delete country
    static async deleteServices(country_id: number) {
        await CountryRepository.delete(country_id);
    }
}
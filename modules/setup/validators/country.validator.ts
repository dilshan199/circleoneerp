import { z } from "zod";
import { CountryStatus } from "@/constants/country.constants";

// Country Validator
export const CreateCountrySchema = z.object({
    country_code: z.string().trim().min(2, "Country code is required!").max(5).transform(value => value.toUpperCase()),
    country_name: z.string().trim().min(2, "Country name is required!").max(150),
    country_status: z.enum([
        CountryStatus.ACTIVE, CountryStatus.INACTIVE, CountryStatus.DELETED]).default(CountryStatus.ACTIVE)
});

export const UpdateCountrySchema = CreateCountrySchema.extend({
    country_id: z.number()
});
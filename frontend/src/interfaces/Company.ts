export interface Company {
    company_id: number;
    company_name: string;
    company_type: string;
    company_logo?: string;
    company_cif: string;
    contact_person: string;
    company_phone: string;
    company_address: string;
    company_website?: string;
    company_email: string;
    company_password: string;
    privacy_policy: boolean;
    registration_date: string | Date;
}
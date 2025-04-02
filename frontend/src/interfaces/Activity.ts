

export interface Activity {
    activity_id: number;
    activity_title: string;
    activity_description: string;
    activity_price: string;
    activity_date: string;
    activity_time: string;
    activity_duration: number;
    activity_location: string;
    activity_images: string[];
    difficulty_level: string;
    includes: string;
    excludes: string;
    available_slots: number;
    privacy_policy: boolean;
    category: {
      category_id: number;
      category_name: string;
      category_description: string;
      category_image: string;
    };
    company: {
      company_id: number;
      company_name: string;
      company_type: string;
      company_logo: string;
      contact_person: string;
      company_phone: string;
      company_email: string;
      company_website: string;
    };
  }
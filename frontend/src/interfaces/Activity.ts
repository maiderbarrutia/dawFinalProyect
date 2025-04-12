export interface Activity {
  activity_id: number,
  activity_title: string;
  activity_description: string;
  company_id: number;
  activity_date: string; 
  activity_time: string;
  activity_price: number;
  available_slots: number;
  activity_duration: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  activity_type: string;
  category_id: number;
  activity_location: string;
  activity_images: string[];
  activity_videos: string[];
  includes: string;
  excludes: string;
  privacy_policy: boolean;
  registration_date: Date;
}
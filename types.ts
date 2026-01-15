export enum Category {
  BTS = 'BTS Pilgrimage',
  DRAMA = 'K-Drama Spot',
  FOOD = 'Busan Flavor',
  CULTURE = 'Local Culture'
}

export interface Spot {
  id: string;
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  location: string;
  highlight?: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type: 'activity' | 'meal' | 'transport' | 'free';
}

export interface DailySchedule {
  day: number;
  title: string;
  items: ScheduleItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
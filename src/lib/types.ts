export function getCategoryStyle(category: string): { bg: string, text: string, border: string, leftBorder: string } {
  switch (category) {
    case 'Appointments':
      return { bg: 'bg-[#fef9c3]', text: 'text-[#854d0e]', border: 'border-[#fde047]', leftBorder: 'border-l-yellow-400' }; // Soft Gold
    case 'Orders':
      return { bg: 'bg-[#e0f2fe]', text: 'text-[#075985]', border: 'border-[#7dd3fc]', leftBorder: 'border-l-sky-400' };       // Sky Blue
    case 'School/Class':
      return { bg: 'bg-[#ecfdf5]', text: 'text-[#065f46]', border: 'border-[#6ee7b7]', leftBorder: 'border-l-emerald-400' };// Emerald Green
    case 'Private':
      return { bg: 'bg-[#f5f3ff]', text: 'text-[#5b21b6]', border: 'border-[#ddd6fe]', leftBorder: 'border-l-purple-400' };    // Lavender
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', leftBorder: 'border-l-gray-400' };
  }
}

export type Category = 'Appointments' | 'Orders' | 'School/Class' | 'Private' | 'Other';

export interface CategorizedEmail {
  id: string;
  uid: number;
  subject: string;
  from: string;
  date: Date;
  snippet: string;
  category: Category;
  summary: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  summary: string;
  category: Category;
}

export interface MailMindData {
  emails: CategorizedEmail[];
  scheduleItems: ScheduleItem[];
}

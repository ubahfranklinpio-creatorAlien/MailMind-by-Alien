import { ScheduleItem, getCategoryStyle } from "@/lib/types";
import { CalendarDays, ShoppingBag, BookOpen, Lock, Tag, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Appointments': return <CalendarDays className={className} />;
    case 'Orders': return <ShoppingBag className={className} />;
    case 'School/Class': return <BookOpen className={className} />;
    case 'Private': return <Lock className={className} />;
    default: return <Tag className={className} />;
  }
};

export function ScheduleView({ items }: { items: ScheduleItem[] }) {

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500 glass rounded-3xl mt-4">
        <CalendarDays className="w-16 h-16 mb-4 opacity-30 text-gray-400" />
        <h3 className="text-xl font-bold text-gray-700">No Events Scheduled</h3>
        <p className="mt-2 text-sm max-w-md text-center">Your emails didn't contain any clear upcoming events or appointments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4 pb-12">
      <header className="mb-8">
        <div className="text-emerald-600 font-bold mb-1 uppercase tracking-tighter text-sm">Today's Pulse</div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Your Agenda.</h2>
        <p className="text-gray-500 mt-1">Based on your recent emails</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => {
          const styles = getCategoryStyle(item.category);
          return (
            <div key={item.id} className="glass-card p-6 flex gap-6 hover:shadow-lg transition-all group border-l-4" style={{borderLeftColor: styles.border.replace('border-', '')}}>
              
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border", styles.bg, styles.text, styles.border)}>
                 <CategoryIcon category={item.category} className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", styles.text)}>{item.category}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                
                {item.location && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1 opacity-70" />
                    {item.location}
                  </div>
                )}
                
                <p className="text-sm text-gray-600">{item.summary}</p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

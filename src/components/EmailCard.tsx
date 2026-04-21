import React from "react";
import { CategorizedEmail, getCategoryStyle } from "@/lib/types";
import { Mail, Clock, CalendarDays, ShoppingBag, BookOpen, Lock, Tag } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EmailCardProps {
  email: CategorizedEmail;
  key?: React.Key;
}

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Appointments': return <CalendarDays className={className} />;
    case 'Orders': return <ShoppingBag className={className} />;
    case 'School/Class': return <BookOpen className={className} />;
    case 'Private': return <Lock className={className} />;
    default: return <Tag className={className} />;
  }
};

export function EmailCard({ email }: EmailCardProps) {
  const styles = getCategoryStyle(email.category);

  return (
    <div className={cn(
      "p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group",
      "glass-card border-l-4",
      styles.leftBorder
    )}>
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex gap-4 items-center flex-1">
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0",
            styles.bg, styles.text, "border", styles.border
          )}>
            {email.category}
          </div>
          <div className="flex-1 truncate">
            <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-emerald-700 transition-colors">
              {email.subject}
            </h3>
            <p className="text-sm text-gray-500 truncate">{email.from}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-400">
            {format(new Date(email.date), "MMM d, h:mm a")}
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 line-clamp-2 mt-2">
        {email.summary}
      </p>
    </div>
  );
}

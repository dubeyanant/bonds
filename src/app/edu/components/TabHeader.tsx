import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";

interface TabHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
  count: number;
  colorScheme: "blue" | "green" | "orange" | "purple";
  sortLabel: string;
}

const colorConfig = {
  blue: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    iconBg: "bg-blue-500",
    titleColor: "text-blue-900",
    descColor: "text-blue-700",
    countColor: "text-blue-600",
    buttonHover: "hover:bg-blue-50",
    buttonBorder: "border-blue-200"
  },
  green: {
    bg: "from-green-50 to-green-100",
    border: "border-green-200",
    iconBg: "bg-green-500",
    titleColor: "text-green-900",
    descColor: "text-green-700",
    countColor: "text-green-600",
    buttonHover: "hover:bg-green-50",
    buttonBorder: "border-green-200"
  },
  orange: {
    bg: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    iconBg: "bg-orange-500",
    titleColor: "text-orange-900",
    descColor: "text-orange-700",
    countColor: "text-orange-600",
    buttonHover: "hover:bg-orange-50",
    buttonBorder: "border-orange-200"
  },
  purple: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    iconBg: "bg-purple-500",
    titleColor: "text-purple-900",
    descColor: "text-purple-700",
    countColor: "text-purple-600",
    buttonHover: "hover:bg-purple-50",
    buttonBorder: "border-purple-200"
  }
};

export function TabHeader({ 
  icon, 
  title, 
  description, 
  count, 
  colorScheme, 
  sortLabel 
}: TabHeaderProps) {
  const colors = colorConfig[colorScheme];
  
  return (
    <div className={`bg-gradient-to-r ${colors.bg} rounded-xl p-6 border ${colors.border}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.iconBg} text-white`}>
            {icon}
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${colors.titleColor}`}>{title}</h3>
            <p className={`${colors.descColor} mb-1`}>{description}</p>
            <span className={`${colors.countColor} text-sm font-medium`}>{count} bonds found</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 bg-white ${colors.buttonHover} ${colors.buttonBorder}`}
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortLabel}
        </Button>
      </div>
    </div>
  );
}

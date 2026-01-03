import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        label: string;
    };
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, trend, className }: StatsCardProps) {
    return (
        <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-6", className)}>
            <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline space-x-3">
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className={cn(
                        "flex items-center text-xs font-medium",
                        trend.value > 0 ? "text-green-600" : trend.value < 0 ? "text-red-600" : "text-muted-foreground"
                    )}>
                        {trend.value > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {Math.abs(trend.value)}%
                        <span className="text-muted-foreground ml-1 font-normal">{trend.label}</span>
                    </div>
                )}
            </div>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
    );
}

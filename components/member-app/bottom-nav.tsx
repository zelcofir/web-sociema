'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AppTab } from '@/lib/types-member';
import { Home, Database, ShieldCheck, CalendarDays, UserCircle } from 'lucide-react';

interface BottomNavProps {
    activeTab: AppTab;
    onTabChange: (tab: AppTab) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
    const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
        { id: 'home', label: 'Inicio', icon: <Home className="h-6 w-6" /> },
        { id: 'exchange', label: 'Puntos', icon: <Database className="h-6 w-6" /> },
        { id: 'endorsements', label: 'Avales', icon: <ShieldCheck className="h-6 w-6" /> },
        { id: 'calendar', label: 'Eventos', icon: <CalendarDays className="h-6 w-6" /> },
        { id: 'profile', label: 'Perfil', icon: <UserCircle className="h-6 w-6" /> }
    ];

    return (
        <nav className="sticky md:absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center z-50 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "flex flex-col items-center gap-1 transition-all",
                        activeTab === tab.id ? "text-[#1d4ed8]" : "text-slate-400"
                    )}
                >
                    {tab.icon}
                    <span className={cn(
                        "text-[9px] font-bold uppercase tracking-tight",
                        activeTab === tab.id ? "opacity-100" : "opacity-60"
                    )}>
                        {tab.label}
                    </span>
                </button>
            ))}
        </nav>
    );
};

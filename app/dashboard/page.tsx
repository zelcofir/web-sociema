'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MemberPoints, AppTab } from '@/lib/types-member';
import { BottomNav } from '@/components/member-app/bottom-nav';
import { HomeSection } from '@/components/member-app/home-section';
import { PointsSection } from '@/components/member-app/points-section';
import { EndorsementsSection } from '@/components/member-app/endorsements-section';
import { EventsCalendar } from '@/components/member-app/events-calendar';
import { ProfileSection } from '@/components/member-app/profile-section';
import Image from 'next/image';
import { Search, Bell } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<MemberPoints | null>(null);
    const [activeTab, setActiveTab] = useState<AppTab>('home');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedUser = localStorage.getItem('sociema_user');
        if (!savedUser) {
            router.push('/login');
        } else {
            setUser(JSON.parse(savedUser));
        }
    }, [router]);

    if (!isClient || !user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeSection user={user} onNavigate={setActiveTab} />;
            case 'exchange':
                return <PointsSection user={user} />;
            case 'endorsements':
                return <EndorsementsSection user={user} />;
            case 'calendar':
                return <EventsCalendar />;
            case 'profile':
                return <ProfileSection user={user} />;
            default:
                return <HomeSection user={user} onNavigate={setActiveTab} />;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'home': return 'SOCIEMApp Dashboard';
            case 'exchange': return 'Mis Puntos';
            case 'endorsements': return 'Avales';
            case 'calendar': return 'Eventos';
            case 'profile': return 'Mi Perfil';
            default: return 'SOCIEMApp';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative">
            <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 bg-white md:shadow-xl md:my-8 md:rounded-[2rem] overflow-hidden relative">
                {/* Header */}
                <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                                src="/logo_SOCIEMA.png"
                                alt="SOCIEMApp Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-[#1d4ed8]">
                            {getTitle()}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <Search size={20} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative text-slate-500">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>

                {/* Navigation */}
            </div>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}

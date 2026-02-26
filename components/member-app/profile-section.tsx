'use client';

import React from 'react';
import { MemberPoints } from '@/lib/types-member';
import { User, Mail, Shield, LogOut, Settings, Bell, HelpCircle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileSectionProps {
    user: MemberPoints;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('sociema_user');
        router.push('/');
    };

    return (
        <div className="pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-6 pt-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-[#1d4ed8] border-4 border-white shadow-lg mb-4">
                        <User size={48} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{user.nombre}</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">DNI: {user.dni}</p>
                    <span className="mt-3 px-3 py-1 bg-blue-50 text-[#1d4ed8] text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-100">
                        {user.estado}
                    </span>
                </div>

                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Ajustes de Cuenta</h3>

                    <button className="w-full bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                            <Settings size={20} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-700">Editar Perfil</p>
                            <p className="text-[10px] text-slate-400">Información personal y contacto</p>
                        </div>
                        <ChevronRight className="text-slate-300 h-4 w-4" />
                    </button>

                    <button className="w-full bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                            <Bell size={20} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-700">Notificaciones</p>
                            <p className="text-[10px] text-slate-400">Alertas de eventos y avisos</p>
                        </div>
                        <ChevronRight className="text-slate-300 h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-3 mt-8">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Soporte</h3>

                    <button className="w-full bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                            <HelpCircle size={20} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-700">Centro de Ayuda</p>
                            <p className="text-[10px] text-slate-400">FAQs y guías de uso</p>
                        </div>
                        <ChevronRight className="text-slate-300 h-4 w-4" />
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-10 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm border border-red-100 active:scale-[0.98] transition-all"
                >
                    <LogOut size={18} />
                    Cerrar Sesión
                </button>

                <p className="text-center text-[10px] text-slate-300 mt-8 mb-4">
                    SOCIEMApp v2.0.0<br />Desarrollado por SOCIEMA
                </p>
            </div>
        </div>
    );
};

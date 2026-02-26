'use client';

import React, { useState, useEffect } from 'react';
import { MemberPoints } from '@/lib/types-member';
import { User, Mail, Shield, LogOut, Settings, Bell, HelpCircle, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client';
import { toast } from 'sonner';

interface ProfileSectionProps {
    user: MemberPoints;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState(user.correo || '');
    const [loading, setLoading] = useState(false);
    const [isLinked, setIsLinked] = useState(!!user.correo);

    useEffect(() => {
        // Sync with props
        if (user.correo) {
            setEmail(user.correo);
            setIsLinked(true);
        }
    }, [user.correo]);

    useEffect(() => {
        // Check if user is already authenticated with Supabase on mount
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                setEmail(session.user.email);
                setIsLinked(true);
            }
        };
        checkAuth();
    }, [supabase.auth]);

    const handleLogout = () => {
        localStorage.removeItem('sociema_user');
        supabase.auth.signOut();
        router.push('/');
    };

    const handleLinkEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + '/dashboard',
                    data: {
                        dni: user.dni,
                        nombre: user.nombre
                    }
                }
            });

            if (error) throw error;
            toast.success('¡Enlace enviado! Revisa tu correo profesional.');
        } catch (error: any) {
            toast.error(error.message || 'Error al enviar el enlace');
        } finally {
            setLoading(false);
        }
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

                <div className="space-y-6">
                    {/* Sección de Vinculación de Correo */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#1d4ed8]">
                                <Mail size={18} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">Correo Electrónico</h3>
                        </div>

                        {isLinked ? (
                            <div className="flex flex-col items-center py-4 bg-blue-50/30 rounded-2xl border border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <CheckCircle2 size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Vinculado</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 mb-4">{email}</p>
                                <button
                                    onClick={async () => {
                                        setLoading(true);
                                        try {
                                            await supabase.auth.signOut();
                                            setIsLinked(false);
                                            setEmail('');
                                            toast.info('Correo desvinculado');
                                        } catch (error: any) {
                                            toast.error(error.message || 'Error al desvincular');
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                    disabled={loading}
                                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={12} /> : 'Cambiar Correo'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleLinkEmail} className="space-y-4">
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Vincula tu correo personal para habilitar la recuperación de cuenta y recibir comunicados oficiales.
                                </p>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[#1d4ed8] outline-none transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#1d4ed8] text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Vincular Correo'}
                                </button>
                            </form>
                        )}
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-3">Ajustes de Cuenta</h3>
                        <div className="space-y-3">
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
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-3">Soporte</h3>
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
                        className="w-full mt-4 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm border border-red-100 active:scale-[0.98] transition-all"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>

                <p className="text-center text-[10px] text-slate-300 mt-8 mb-4">
                    SOCIEMApp v2.0.0<br />Desarrollado por SOCIEMA
                </p>
            </div>
        </div>
    );
};

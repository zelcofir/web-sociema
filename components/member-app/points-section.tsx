'use client';

import React, { useState, useEffect } from 'react';
import { MemberPoints, Activity } from '@/lib/types-member';
import Papa from 'papaparse';
import { Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointsSectionProps {
    user: MemberPoints;
}

export const PointsSection = ({ user }: PointsSectionProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const sheetId = "1WecjE8rZ7Fnllj3NjC4ffbqu0Riic4y3uIu4BD61NFo";
                const gid = "2081983909";
                const response = await fetch(`/api/data/${sheetId}?gid=${gid}`);
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const mapped: Activity[] = (results.data as any[]).map((row) => ({
                            dni: (row['DNI'] || '').trim(),
                            actividad: row['Actividad'] || '',
                            fecha: row['Fecha'] || '',
                            correo: row['Correo'] || '',
                            categoria: 'Actividad Académica',
                            puntos: 0
                        })).filter((a: Activity) => a.dni === user.dni);

                        setActivities(mapped);
                        setLoading(false);
                    }
                });
            } catch (err) {
                console.error("Error fetching activities:", err);
                setLoading(false);
            }
        };
        fetchActivities();
    }, [user.dni]);

    return (
        <div className="pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-6 pt-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-blue-50/50">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h4 className="text-xl font-bold text-slate-800">{user.nombre}</h4>
                            <p className="text-sm text-slate-500 font-medium">DNI: {user.dni}</p>
                        </div>
                        <span className={cn(
                            "text-[10px] font-bold px-3 py-1 rounded-full",
                            user.estado.includes('Titular') ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                        )}>
                            {user.estado}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Asistente</p>
                            <p className="text-lg font-black text-slate-700">{user.asistente}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Ponente</p>
                            <p className="text-lg font-black text-slate-700">{user.ponente}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Org.</p>
                            <p className="text-lg font-black text-slate-700">{user.organizador}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Acumulado</p>
                            <p className="text-3xl font-black text-[#1d4ed8]">{user.total} <span className="text-sm font-bold text-slate-400">pts</span></p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-2xl text-[#1d4ed8]">
                            <Award size={24} />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Historial de Actividades</h5>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1d4ed8]"></div>
                            </div>
                        ) : activities.length > 0 ? activities.map((activity, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-[#1d4ed8] uppercase mb-0.5">{activity.categoria}</p>
                                    <h6 className="text-sm font-bold text-slate-800 leading-tight">{activity.actividad}</h6>
                                    <div className="flex gap-2 mt-1">
                                        <p className="text-[10px] text-slate-400 font-medium">{activity.fecha}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-emerald-600">+{activity.puntos}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-xs text-slate-400">No se encontraron actividades registradas.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                    <h5 className="text-sm font-bold text-[#1d4ed8] mb-2 flex items-center gap-2">
                        <TrendingUp size={16} /> Sobre tus puntos
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Tus puntos se actualizan periódicamente según los registros de asistencia, ponencias y organización de eventos avalados por SOCIEMA. Estos puntos determinan tu prioridad para los intercambios internacionales.
                    </p>
                </div>
            </div>
        </div>
    );
};

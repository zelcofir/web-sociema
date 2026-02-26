'use client';

import React, { useState, useEffect } from 'react';
import { MemberPoints, Endorsement } from '@/lib/types-member';
import Papa from 'papaparse';
import { Calendar as CalendarIcon, MapPin, Download, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EndorsementsSectionProps {
    user: MemberPoints;
}

export const EndorsementsSection = ({ user }: EndorsementsSectionProps) => {
    const [activeYear, setActiveYear] = useState<number | 'all'>('all');
    const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEndorsements = async () => {
            try {
                const sheetId = "1DZCt9E4ffllJg0QI0ltkbh0iewSyyhZrVqE3vjBYi7s";
                const gid = "1652463125";
                const response = await fetch(`/api/data/${sheetId}?gid=${gid}`);
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const mapped: Endorsement[] = (results.data as any[]).map((row) => {
                            const fechaEmision = row['FECHA DE EMISIÓN'] || '';
                            const yearMatch = fechaEmision.match(/\d{4}/);
                            const year = yearMatch ? parseInt(yearMatch[0]) : (parseInt(row['Año']) || 2026);

                            return {
                                id: row['CÓDIDO'] || row['#'] || Math.random().toString(),
                                dni: row['DNI'] || '',
                                title: row['NOMBRE DEL DOCUMENTO'] || '',
                                year: year,
                                status: row['ESTADO'] || 'Aprobado y enviado',
                                date: fechaEmision || row['FECHA DE SOLICITUD'] || '',
                                location: row['UBICACIÓN'] || '',
                                pdfLink: row['LINK PDF'] || ''
                            };
                        }).filter((e: Endorsement) => e.title !== '' && e.dni === user.dni);
                        setEndorsements(mapped);
                        setLoading(false);
                    }
                });
            } catch (err) {
                console.error("Error fetching endorsements:", err);
                setLoading(false);
            }
        };
        fetchEndorsements();
    }, [user.dni]);

    const years = Array.from(new Set(endorsements.map(e => e.year))).sort((a, b) => b - a);
    const filtered = endorsements.filter(e => activeYear === 'all' || e.year === activeYear);

    return (
        <div className="pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-6 pt-6">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    <button
                        onClick={() => setActiveYear('all')}
                        className={cn(
                            "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                            activeYear === 'all' ? "bg-[#1d4ed8] text-white" : "bg-white text-slate-500 border border-slate-200"
                        )}
                    >
                        Todos
                    </button>
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={cn(
                                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                                activeYear === year ? "bg-[#1d4ed8] text-white" : "bg-white text-slate-500 border border-slate-200"
                            )}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-6 mt-6 space-y-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d4ed8]"></div>
                    </div>
                ) : filtered.length > 0 ? filtered.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-[#1d4ed8]">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aval Académico</span>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                item.status === 'Aprobado y enviado' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                            )}>
                                {item.status}
                            </span>
                        </div>
                        <h4 className="font-bold text-slate-800 leading-tight mb-4 text-sm">{item.title}</h4>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-medium uppercase tracking-wider">
                                    <CalendarIcon size={12} />
                                    <span>{item.date}</span>
                                </div>
                                {item.location && (
                                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-medium uppercase tracking-wider">
                                        <MapPin size={12} />
                                        <span className="truncate max-w-[200px]">{item.location}</span>
                                    </div>
                                )}
                            </div>
                            {item.pdfLink && (
                                <a
                                    href={item.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-50 w-10 h-10 rounded-2xl flex items-center justify-center text-[#1d4ed8] active:scale-95 transition-transform"
                                >
                                    <Download size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-sm">No hay avales registrados para este miembro.</p>
                    </div>
                )}
            </div>

            <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#1d4ed8] text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform">
                <Plus size={28} />
            </button>
        </div>
    );
};

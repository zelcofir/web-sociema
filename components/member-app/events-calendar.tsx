'use client';

import React, { useState, useEffect } from 'react';
import { ScientificEvent } from '@/lib/types-member';
import Papa from 'papaparse';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/client';
import { toast } from 'sonner';

export const EventsCalendar = () => {
    const supabase = createClient();
    const [events, setEvents] = useState<ScientificEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const today = new Date();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch Events from Sheet
                const sheetId = "1WecjE8rZ7Fnllj3NjC4ffbqu0Riic4y3uIu4BD61NFo";
                const gid = "534795118";
                const response = await fetch(`/api/data/${sheetId}?gid=${gid}`);
                if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    error: (err: any) => {
                        console.error("PapaParse error:", err);
                        setLoading(false);
                    },
                    complete: async (results) => {
                        try {
                            const mapped: ScientificEvent[] = (results.data as any[]).map((row) => {
                                const fechaStr = (row['Fecha'] || '').trim();
                                const nombre = row['Nombre de la Actividad'] || row['Actividad'] || '';
                                const id = row['ID'] || nombre.replace(/\s+/g, '-').toLowerCase();

                                let eventDate: Date | null = null;
                                if (fechaStr) {
                                    const parts = fechaStr.split('/');
                                    if (parts.length === 3) {
                                        eventDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                                    }
                                }

                                if (!eventDate || isNaN(eventDate.getTime())) {
                                    eventDate = new Date(2099, 0, 1);
                                }

                                return {
                                    id: id,
                                    title: nombre,
                                    type: (row['Subcategoría específica'] || row['Categoria'] || 'Capacitación') as any,
                                    date: eventDate,
                                    time: row['Mes'] || '',
                                    location: row['Comités Organizadores'] || '',
                                    points: parseFloat(row['Puntos de intercambio'] || row['Puntos']) || 0,
                                    imageUrl: row['imageUrl'] || `https://picsum.photos/seed/${id}/400/300`
                                };
                            }).filter(e => e.title !== '' && e.title !== 'X');

                            setEvents(mapped.sort((a, b) => a.date.getTime() - b.date.getTime()));
                        } catch (err) {
                            console.error("Error processing events data:", err);
                        } finally {
                            setLoading(false);
                        }
                    }
                });
            } catch (err) {
                console.error("Error fetching events:", err);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const upcomingEvents = events.filter(e => e.date >= today);
    const pastEvents = events.filter(e => e.date < today).reverse();

    return (
        <div className="pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-6 pt-6">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 ml-1">Próximos Eventos</h3>
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d4ed8]"></div>
                        </div>
                    ) : upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4 items-center transition-colors">
                            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-[#1d4ed8] uppercase">{event.type}</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+{event.points} PTS</span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-800 line-clamp-2">{event.title}</h4>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                                        <CalendarIcon size={12} />
                                        <span>{event.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] truncate">
                                            <MapPin size={12} />
                                            <span className="truncate">{event.location || 'SOCIEMA'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-400 text-sm">No hay eventos próximos.</p>
                        </div>
                    )}
                </div>

                {pastEvents.length > 0 && (
                    <>
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 mt-10 ml-1">Eventos Pasados</h3>
                        <div className="space-y-3 opacity-60">
                            {pastEvents.slice(0, 5).map(event => (
                                <div key={event.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-center">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-xs text-slate-700 truncate">{event.title}</h4>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{event.date.toLocaleDateString('es-ES')}</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 grayscale">+{event.points} PTS</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

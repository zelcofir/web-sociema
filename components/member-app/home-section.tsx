'use client';

import React, { useState, useEffect } from 'react';
import { MemberPoints, Publication, ScientificEvent, AppTab } from '@/lib/types-member';
import Papa from 'papaparse';
import { Award, TrendingUp, ChevronRight, ExternalLink, Calendar as CalendarIcon, MapPin, Download } from 'lucide-react';

interface HomeSectionProps {
    user: MemberPoints;
    onNavigate: (tab: AppTab) => void;
}

export const HomeSection = ({ user, onNavigate }: HomeSectionProps) => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [dailyArticle, setDailyArticle] = useState<Publication | null>(null);
    const [events, setEvents] = useState<ScientificEvent[]>([]);
    const [loadingPubs, setLoadingPubs] = useState(true);
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        const fetchPubs = async () => {
            try {
                const sheetId = "1xu1ASIT4jBMdY6wIJVJXsh77-s9VSqWYxWpbMWa_gE0";
                const gid = "1243019117";
                const response = await fetch(`/api/data/${sheetId}?gid=${gid}`);
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const mapped: Publication[] = (results.data as any[]).map((row) => ({
                            title: row['title'] || '',
                            type: row['type'] || '',
                            authors: row['authors'] || '',
                            year: row['year'] || '',
                            link: row['link'] || '',
                            imageUrl: row['image_url'] || ''
                        })).filter(p => p.title !== '');

                        setPublications(mapped);
                        if (mapped.length > 0) {
                            const randomIndex = Math.floor(Math.random() * mapped.length);
                            setDailyArticle(mapped[randomIndex]);
                        }
                        setLoadingPubs(false);
                    }
                });
            } catch (err) {
                console.error("Error fetching publications:", err);
                setLoadingPubs(false);
            }
        };

        const fetchEvents = async () => {
            try {
                const sheetId = "1WecjE8rZ7Fnllj3NjC4ffbqu0Riic4y3uIu4BD61NFo";
                const gid = "534795118";
                const response = await fetch(`/api/data/${sheetId}?gid=${gid}`);
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const mapped: ScientificEvent[] = (results.data as any[]).map((row) => {
                            const fechaStr = (row['Fecha'] || '').trim();
                            const nombre = row['Nombre de la Actividad'] || row['Actividad'] || '';
                            const id = row['ID'] || Math.random().toString();

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
                        }).filter(e => e.title !== '' && e.date >= today);

                        setEvents(mapped.sort((a, b) => a.date.getTime() - b.date.getTime()));
                        setLoadingEvents(false);
                    }
                });
            } catch (err) {
                console.error("Error fetching events:", err);
                setLoadingEvents(false);
            }
        };

        fetchPubs();
        fetchEvents();
    }, []);

    return (
        <div className="pb-24 animate-in fade-in duration-500">
            <div className="px-6 pt-6">
                <div className="bg-[#1d4ed8] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute -right-8 -top-8 w-40 h-40 bg-yellow-400 opacity-10 rounded-full"></div>
                    <div className="relative z-10">
                        <p className="text-blue-100/80 text-sm font-medium">¡Hola de nuevo!</p>
                        <h2 className="text-2xl font-bold mt-0.5">{user.nombre}</h2>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                                <p className="text-blue-100/60 text-[10px] uppercase font-bold tracking-widest mb-1">Puntos Acumulados</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold">{user.total}</span>
                                    <span className="text-[10px] text-yellow-400 font-bold">PTS</span>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                                <p className="text-blue-100/60 text-[10px] uppercase font-bold tracking-widest mb-1">Tu Estado</p>
                                <div className="flex items-center gap-1.5">
                                    <Award size={14} className="text-yellow-400" />
                                    <span className="text-sm font-bold uppercase truncate">{user.estado}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 ml-1">Acceso Rápido</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => onNavigate('exchange')} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3 active:scale-95 transition-all">
                        <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-2xl text-[#1d4ed8]">
                            <Database size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-800 text-sm">Mis Puntos</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Detalle y ranking</p>
                        </div>
                    </button>
                    <button onClick={() => onNavigate('endorsements')} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3 active:scale-95 transition-all">
                        <div className="w-10 h-10 bg-yellow-50 flex items-center justify-center rounded-2xl text-yellow-600">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-800 text-sm">Avales</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Certificaciones</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Article of the Day */}
            <div className="px-6 mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Artículo del Día</h3>
                    <span className="text-[10px] font-bold text-[#1d4ed8] bg-blue-50 px-2 py-1 rounded-full">Destacado</span>
                </div>
                {loadingPubs ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1d4ed8]"></div>
                    </div>
                ) : dailyArticle ? (
                    <a
                        href={dailyArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group active:scale-[0.98] transition-all"
                    >
                        <div className="h-40 bg-slate-100 relative">
                            <img
                                src={dailyArticle.imageUrl || 'https://picsum.photos/seed/daily/600/300'}
                                alt={dailyArticle.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4">
                                <span className="text-[9px] font-bold text-white/90 uppercase bg-[#1d4ed8]/80 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                                    {dailyArticle.type}
                                </span>
                                <h4 className="font-bold text-white leading-tight mt-1 line-clamp-2 text-sm">
                                    {dailyArticle.title}
                                </h4>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex-1">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{dailyArticle.authors}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Publicado en {dailyArticle.year}</p>
                            </div>
                            <ChevronRight className="text-slate-300 h-4 w-4" />
                        </div>
                    </a>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400">No hay artículos disponibles hoy.</p>
                    </div>
                )}
            </div>

            {/* Upcoming Events */}
            <div className="px-6 mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Próximos Eventos</h3>
                    <button onClick={() => onNavigate('calendar')} className="text-xs font-semibold text-[#1d4ed8] px-2 py-1 bg-blue-50 rounded-lg">Ver todo</button>
                </div>
                <div className="space-y-4">
                    {loadingEvents ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1d4ed8]"></div>
                        </div>
                    ) : events.length > 0 ? events.slice(0, 2).map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex gap-4 items-center active:bg-slate-50 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex-shrink-0 relative overflow-hidden">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[9px] font-bold text-[#1d4ed8] uppercase tracking-wider">{event.type}</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">+{event.points} PTS</span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-800 truncate">{event.title}</h4>
                                <div className="flex items-center gap-3 mt-1.5 text-slate-500 text-[10px]">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon size={12} />
                                        <span>{event.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-300 h-4 w-4" />
                        </div>
                    )) : (
                        <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-xs text-slate-400">No hay eventos próximos registrados.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Also export other sub-components to use them in the main dashboard page
import { Database, ShieldCheck } from 'lucide-react';

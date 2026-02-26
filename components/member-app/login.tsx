'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { MemberPoints } from '@/lib/types-member';

interface LoginProps {
    onLogin: (member: MemberPoints) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
    const [dni, setDni] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dni) return;
        setLoading(true);
        setError('');

        try {
            const sheetId = "1WecjE8rZ7Fnllj3NjC4ffbqu0Riic4y3uIu4BD61NFo";

            // 1. Fetch Master List (GID 1859124137) for Authentication
            const masterRes = await fetch(`/api/data/${sheetId}?gid=1859124137`);
            const masterText = await masterRes.text();

            Papa.parse(masterText, {
                header: true,
                skipEmptyLines: true,
                complete: async (masterResults) => {
                    const masterData = masterResults.data as any[];
                    const masterUser = masterData.find((row) =>
                        (row['DNI'] || '').toString().trim() === dni.trim()
                    );

                    if (!masterUser) {
                        setError('DNI no encontrado en la base de datos maestra de SOCIEMApp.');
                        setLoading(false);
                        return;
                    }

                    // 2. Fetch Points List (GID 0) to merge info if available
                    try {
                        const pointsRes = await fetch(`/api/data/${sheetId}?gid=0`);
                        const pointsText = await pointsRes.text();

                        Papa.parse(pointsText, {
                            header: true,
                            skipEmptyLines: true,
                            complete: (pointsResults) => {
                                const pointsDataList = pointsResults.data as any[];
                                const pointsData = pointsDataList.find((row) =>
                                    (row['DNI'] || '').toString().trim() === dni.trim()
                                );

                                const finalUser: MemberPoints = {
                                    dni: dni.trim(),
                                    nombre: masterUser['Nombre y apellidos'] || masterUser['Nombre'] || '',
                                    asistente: parseInt(pointsData?.['Puntos Asistente']) || 0,
                                    ponente: parseInt(pointsData?.['Puntos Ponente']) || 0,
                                    organizador: parseInt(pointsData?.['Puntos Organizador']) || 0,
                                    total: parseInt(pointsData?.['Total acumulado']) || 0,
                                    estado: masterUser['Estado de Miembro'] || pointsData?.['Estado de Miembro'] || 'Aspirante'
                                };

                                onLogin(finalUser);
                                setLoading(false);
                            }
                        });
                    } catch (err) {
                        // Proceed with master data only if points fetch fails
                        onLogin({
                            dni: dni.trim(),
                            nombre: masterUser['Nombre y apellidos'] || masterUser['Nombre'] || '',
                            asistente: 0,
                            ponente: 0,
                            organizador: 0,
                            total: 0,
                            estado: masterUser['Estado de Miembro'] || 'Aspirante'
                        });
                        setLoading(false);
                    }
                }
            });
        } catch (err) {
            setError('Error al conectar con la base de datos.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 mb-4">
                        <img
                            src="/logo_SOCIEMA.png"
                            alt="SOCIEMApp Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">SOCIEMApp</h1>
                    <p className="text-sm text-slate-500 font-medium">Portal Académico</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">DNI del Miembro</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu DNI"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1d4ed8] outline-none transition-all"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                    <button
                        disabled={loading}
                        className="w-full py-3 bg-[#1d4ed8] text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>

                <p className="mt-8 text-center text-[10px] text-slate-400 leading-relaxed">
                    Si no estás registrado, <a href="https://docs.google.com/forms/d/e/1FAIpQLSdllGhcarRu46KU3nhwNvr5lRJjr5ww2ztEX6me6fiq-dEmWg/viewform" target="_blank" rel="noopener noreferrer" className="text-[#1d4ed8] font-bold decoration-[#1d4ed8] underline underline-offset-2">regístrate aquí</a> o contacta con la secretaría de SOCIEMApp.
                </p>
            </motion.div>
        </div>
    );
};

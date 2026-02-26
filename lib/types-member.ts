export interface MemberPoints {
    dni: string;
    nombre: string;
    asistente: number;
    ponente: number;
    organizador: number;
    total: number;
    estado: string;
}

export interface Endorsement {
    id: string;
    dni: string;
    title: string;
    year: number;
    status: string;
    date: string;
    location: string;
    pdfLink?: string;
}

export interface ScientificEvent {
    id: string;
    title: string;
    type: 'Congress' | 'Workshop' | 'Symposium' | 'Course' | 'Capacitación' | 'Charla' | 'Taller' | 'Proyecto';
    date: Date;
    time: string;
    location: string;
    points: number;
    imageUrl: string;
}

export interface Publication {
    title: string;
    type: string;
    authors: string;
    year: string;
    link: string;
    imageUrl: string;
}

export interface Activity {
    dni: string;
    fecha: string;
    actividad: string;
    categoria: string;
    puntos: number;
    correo: string;
}

export type AppTab = 'home' | 'exchange' | 'endorsements' | 'calendar' | 'profile';

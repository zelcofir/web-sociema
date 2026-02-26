'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Login } from '@/components/member-app/login';
import { MemberPoints } from '@/lib/types-member';

export default function LoginPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if user is already logged in
        const savedUser = localStorage.getItem('sociema_user');
        if (savedUser) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogin = (user: MemberPoints) => {
        localStorage.setItem('sociema_user', JSON.stringify(user));
        router.push('/dashboard');
    };

    if (!isClient) return null;

    return <Login onLogin={handleLogin} />;
}

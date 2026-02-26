import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.redirect(new URL('/api/data/1WecjE8rZ7Fnllj3NjC4ffbqu0Riic4y3uIu4BD61NFo', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}

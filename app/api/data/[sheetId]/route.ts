import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sheetId: string }> }
) {
  try {
    const { sheetId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const gid = searchParams.get('gid') || '0';

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: "Hoja no encontrada o no es pública" }, { status: 404 });
    }

    const csvData = await response.text();
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos de Google Sheets" }, { status: 500 });
  }
}

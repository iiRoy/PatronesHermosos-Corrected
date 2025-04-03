import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();

    const [rows] = await db.execute('SELECT * FROM registrations');
    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
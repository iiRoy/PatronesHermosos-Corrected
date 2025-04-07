import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, workshopId } = await req.json();

    if (!name || !email || !workshopId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Check for duplicate registration
    const [existing] = await db.execute(
      'SELECT * FROM registrations WHERE email = ? AND workshop_id = ?',
      [email, workshopId]
    );
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: 'Already registered for this workshop' }, { status: 409 });
    }

    // Insert new registration
    const [result] = await db.execute(
      'INSERT INTO registrations (name, email, workshop_id) VALUES (?, ?, ?)',
      [name, email, workshopId]
    );

    const newRegistration = { id: (result as any).insertId, name, email, workshopId, registered_at: new Date() };
    return NextResponse.json({ message: 'Registration successful', data: newRegistration }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
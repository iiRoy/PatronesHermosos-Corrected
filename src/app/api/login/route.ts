import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    const user = (users as any[])[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', user: { email: user.email, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
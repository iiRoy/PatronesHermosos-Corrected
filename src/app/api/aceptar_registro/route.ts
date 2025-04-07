import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import { sendEmail } from '@/utils/email';

export async function POST(req: NextRequest) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ error: 'Missing registration ID' }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Update the registration to accepted
    const [result] = await db.execute(
      'UPDATE registrations SET accepted = TRUE WHERE id = ? AND accepted = FALSE',
      [registrationId]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Registration not found or already accepted' }, { status: 404 });
    }

    // Fetch the updated registration details
    const [rows] = await db.execute('SELECT * FROM registrations WHERE id = ?', [registrationId]);
    const registration = (rows as any[])[0];

    // Send acceptance email
    await sendEmail({
      to: registration.email,
      subject: 'Congratulations! You’ve Been Accepted to the Workshop',
      text: `Hi ${registration.name},\n\nGreat news! You've been accepted to Workshop ${registration.workshop_id}. We’re excited to see you there!\n\nBest,\nThe Engineering Workshops Team`,
      html: `
        <h1>Congratulations, ${registration.name}!</h1>
        <p>Great news! You've been accepted to <strong>Workshop ${registration.workshop_id}</strong>.</p>
        <p>We’re excited to see you there!</p>
        <p>Best,<br>The Engineering Workshops Team</p>
      `,
    });

    return NextResponse.json({ message: 'Registration accepted and email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
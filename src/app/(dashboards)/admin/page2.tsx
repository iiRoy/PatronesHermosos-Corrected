'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await fetch('/api/registrations');
      const result = await res.json();
      if (res.ok) {
        setRegistrations(result.data);
      }
    };
    fetchRegistrations();
  }, []);

  const handleAccept = async (registrationId: number) => {
    try {
      const res = await fetch('/api/accept-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      });
      const result = await res.json();
      if (res.ok) {
        alert('Registration accepted and email sent!');
        // Refresh the list
        setRegistrations((prev) =>
          prev.map((reg: any) => (reg.id === registrationId ? { ...reg, accepted: true } : reg))
        );
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {registrations.map((reg: any) => (
          <li key={reg.id}>
            {reg.name} - {reg.email} - Workshop {reg.workshop_id} -{' '}
            {reg.accepted ? (
              'Accepted'
            ) : (
              <button onClick={() => handleAccept(reg.id)}>Accept</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
'use client';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NotificationProvider } from "@/components/buttons_inputs/Notification";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    if (!storedUserId) {
      router.replace('/login'); 
    }
  }, [router]);

  if (!userId) {
    return undefined;
  }

  return (
    <NotificationProvider userId={userId}>
      {children}
    </NotificationProvider>
  );
}

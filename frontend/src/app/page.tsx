'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push('/tasks');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Loading...</div>;
}
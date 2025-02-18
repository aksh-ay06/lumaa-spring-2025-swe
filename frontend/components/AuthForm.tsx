"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import { saveToken } from '../utils/auth';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(`auth/${type}`, data);
      if (type === 'login') {
        saveToken(response.data.token);
        router.push('/tasks');
      } else {
        alert('User registered successfully! Please log in.');
        router.push('/login');
      }
    } catch (error) {
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Register'}</h1>
      <div>
        <label>Username</label>
        <input
          {...register('username')}
          placeholder="Enter username"
          className="w-full p-2 border rounded"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password')}
          placeholder="Enter password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
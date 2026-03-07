'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { registerSchema, RegisterInput } from '@/utils/validators';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types/user.types';

export function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const errorData = await res.json();
      alert(errorData.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
      <Input label="Full Name" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
      <Input label="Company Name" {...register('companyName')} error={errors.companyName?.message} />
      
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium text-slate-700">Account Type</label>
        <select {...register('role')} className="border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value={UserRole.SUPPLIER}>Supplier</option>
          <option value={UserRole.IMPORTER}>Importer</option>
          <option value={UserRole.MANUFACTURER}>Manufacturer</option>
        </select>
        {errors.role && <span className="text-xs text-red-500">{errors.role.message}</span>}
      </div>

      <Button type="submit" isLoading={isSubmitting} className="mt-2">Create Account</Button>
    </form>
  );
}
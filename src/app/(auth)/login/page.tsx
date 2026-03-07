import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-2">Sign in to your SupplyBridge account</p>
        </div>
        
        <LoginForm />
        
        <p className="text-center text-sm text-slate-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
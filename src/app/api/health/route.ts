import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      db: 'connected', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    // Log error for server-side debugging
    console.error('Health check database error:', error);
    
    return NextResponse.json(
      { db: 'disconnected', error: 'Connection failed' }, 
      { status: 500 }
    );
  }
}
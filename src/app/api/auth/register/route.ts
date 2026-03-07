import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connect';
import User from '@/models/User';
import { registerSchema } from '@/utils/validators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    await dbConnect();
    
    const { email, name, password, companyName, role } = parsed.data;
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      // Required by PRD: duplicate email returns 409
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    // Just await the creation without assigning to a variable for now
    await User.create({
      email, name, password, role, company: { name: companyName }
    });

    // TODO (Phase 5): Log user.register event async here
    
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    // Log the error to the console for server-side debugging
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
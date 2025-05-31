import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let messages = [];
    try {
      const file = await fs.readFile(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(file);
    } catch (e) {
      // File does not exist or is invalid, start fresh
      messages = [];
    }
    messages.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 
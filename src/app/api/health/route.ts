// Health check endpoint for production monitoring
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // Basic health check
    const timestamp = new Date().toISOString();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

const PYTHON_API_BASE = 'http://127.0.0.1:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("🔄 [Next.js Proxy] Portfolio Rebalance - Incoming request:", {
      url: request.url,
      method: request.method,
      payload: body
    });
    
    console.log("🚀 [Next.js Proxy] Forwarding to Python API:", `${PYTHON_API_BASE}/rebalance`);
    
    const response = await fetch(`${PYTHON_API_BASE}/rebalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log("📡 [Next.js Proxy] Python API response status:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Python API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ [Next.js Proxy] Python API response data:", data);
    console.log("📤 [Next.js Proxy] Sending response to frontend");
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ [Next.js Proxy] Error proxying to Python API:', error);
    return NextResponse.json(
      { error: 'Failed to connect to portfolio rebalancing service' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request): Promise<Response> {
    const API_KEY = process.env.API_KEY;
    const API_URL= 'https://YOUR_NGROK.ngrok-free.app';

    if (!API_KEY || !API_URL) {
        return new Response(
            JSON.stringify({ message: 'API key is not set' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
    
    // Obtain the params sended by GET query
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';

    const queryParams = new URLSearchParams({ email, phone });

    const url = `${API_URL}/users/check?${queryParams.toString()}`;

    try {
        const result = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
        });

        const data = await result.json();
        return new Response(JSON.stringify(data), {
            status: result.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        const err = error as Error;
        return new Response(
            JSON.stringify({ message: 'Request failed', error: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
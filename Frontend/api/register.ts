//INTERMEDIARY API
export async function POST(request: Request): Promise<Response> {
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;

    if (!API_KEY || !API_URL) {
        return new Response(
            JSON.stringify({ message: 'API key is not set' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }

    const url = `${API_URL}/register`;

    try {
        const body = await request.json();
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify(body)
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

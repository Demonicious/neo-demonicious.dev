export async function post({ request }) {
    const url = process.env.WEBHOOK;

    const { username, content } = await request.json();

    if(username && content) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, content })
        });

        if(response.status == 200)
            return { body: { success: true }, status: 200 };
        else
            return { body: { success: true }, status: 200 };
    } else {
        return {
            body: { success: true },
            status: 200
        };
    }
}
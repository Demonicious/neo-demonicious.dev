import dotenv from "dotenv";

export async function post({ request }) {
    dotenv.config();

    const url = process.env['WEBHOOK'];

    const { username, content, email } = await request.json();

    if((username || email) && content) {
        let identifier = '';

        if(username)
            identifier += username;
        
        if(email)
            identifier += ' - ' + email;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: identifier, content })
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
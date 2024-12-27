export const baseURL = "http://localhost:4000/api";

/* export const postRequest = async (url, body) =>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }, 
        body,
    })
    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register: ${errorText}`);
    }
    return { error: true, message}
} */

export const postRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        console.log("data is", data)
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;  
    }
};

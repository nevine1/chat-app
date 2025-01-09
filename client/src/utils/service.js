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

/* export const postRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await response.json();
        console.log("Full Response:", response);
        console.log("Data:", data);

        if (!response.ok) {
            console.error("Server Response:", data);
            throw new Error(data.message || 'Request failed');
        }
        console.log("data is", data)
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;  
    }
}; */


export const postRequest = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  };
  

  export const getRequest = async (url) =>{
    const response = await fetch("url");
    const data = response.json();

    if(!response.ok){

      const message = "An error occured....";

      if(data?.message){
        message = data.message;
      }
      return { error: true, message };
    }

    return data; 
  }
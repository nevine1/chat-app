export const baseUrl = "http://localhost:4000/api";

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
      console.log("Full Response:", response);
      console.log("Data:", data);

      if (!response.ok) {
          throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
  } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
  }
};



  export const getRequest = async (url) =>{
    
    const response = await fetch(url);
    const data = response.json();

    if(!response.ok){

      const message = "An error occurred ....";

      if(data?.message){
        message = data.message;
      }
      return { error: true, message };
    }

    return data; 
  }
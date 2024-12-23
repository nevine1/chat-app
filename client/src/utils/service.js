const baseURL = "http://localhost:5000/api";

export const postRequest = async (url, body) =>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }, 
        body,
    })
    const data = await response.json();

    if(!response.ok){
        let message ;
        if(data?.message){
            message = data.message;
        }else{
            message = data ;
        }
    }
    
    return { error: true, message}
}
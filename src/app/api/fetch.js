export const callApi = async (fetchURL, method, body) =>{
    switch (method){
        case 'GET':
                try {
                    const response = await fetch(fetchURL);
                    const data = await response.json();
                    return data;
                } catch (error) {
                        console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
                    return null;
                }
            break;
        case 'POST':
        case 'PUT':
                try {
                    const response = await fetch(fetchURL, {
                        method: method, 
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    });
                    return response;
            
                } catch (error) {
                    console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
                    return null;
                }
            break;
        case 'DELETE':
                const response = await fetch(fetchURL, {
                    method: 'DELETE'
                });
                return response;
            break;
        default:
            console.error(`Invalid HTTP method. FetchURL was ${fetchURL}.`);
            break;
    }
}




export const fetchAny = async (fetchURL, method) =>{
    try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        return data;
    } catch (error) {
            console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
        return null;
    }
};


export const createAny = async (fetchURL, body) =>{
    //we are going to later on evalaute if the response is sucessful or not with a return true or false
    console.log(`Creating with FetchURL: ${fetchURL}`);
    try {
        await fetch(fetchURL, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({body})
        });
        return true;

    } catch (error) {
        console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
        return false;
    }
};

export const updateAny = async (fetchURL, body) =>{
    //we are going to later on evalaute if the response is sucessful or not with a return true or false
    console.log(`Updating with FetchURL: ${fetchURL}`);
    try {
        await fetch(fetchURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({body})
        });
        return true;

    } catch (error) {
        console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
        return false;
    }
};

export const deleteAny = async (fetchURL, body) =>{
    //we are going to later on evalaute if the response is sucessful or not with a return true or false
    console.log(`Updating with FetchURL: ${fetchURL}`);
    try {
        await fetch(fetchURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({body})
        });
        return true;

    } catch (error) {
        console.error("Failed to fetch:", error.message, `. FetchURL was ${fetchURL}`);
        return false;
    }
};
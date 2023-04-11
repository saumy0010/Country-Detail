import axios from "axios";

export const getCountryByCode = async (code) => {
    let data = null;
    await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
    .then((res) => {
        
     data = res.data;
    
    }).catch((error) => {
        console.error(error.response);
        return error.response.data;
    });
    return data;
}
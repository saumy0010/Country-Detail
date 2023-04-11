import axios from "axios";


export const getCountryByRegion = async (region) => {
    let data = null;
    await axios.get(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => {
        
     data = res.data;
    
    }).catch((error) => {
        console.error(error.response);
        return error.response.data;
    });
    return data;
};

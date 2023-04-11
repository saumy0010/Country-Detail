import axios from "axios";

export const getCountryByName = async(name) => {
    let data = null;
    await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            console.error(error.response);
            data = error.response.data;
            data.status = false;
        }
        );
    return data;

}
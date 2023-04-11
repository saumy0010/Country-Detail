import axios from "axios";

export const getAllCountry = async () => {
    let data = null;
    await axios.get("https://restcountries.com/v3.1/all")
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


const getDataFromAPI = (dataType) => {
    return fetch(`https://recruitment.hal.skygate.io/${dataType}`).then(resp => {
        if (resp.ok)
            return resp.json();
        else {
            throw new Error('Błąd sieci!');
        }
    });
};

export default getDataFromAPI;
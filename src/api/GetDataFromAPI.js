
/**
 * function that gets data about companies from API
 * @function
 * @param {string} dataType specifies what data are we searching for
 * @return {Promise} if response is ok, returns promise object with data
 */
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
export const API_KEY = "d4559cbd63cd42bba87704ff80275f4b";

/**
 * 
 * @param {String} method предмет запроса к api
 * @param {Object} params дополнительные параметры запроса
 * @returns {Promise} запроса
 */
export async function createAPIRequest(method, params) {
    let query = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${API_KEY}&format=json`;

    for (const [name, value] of Object.entries(params)) {
        query += `&${name}=${value}`;
    }

    return fetch(query)
            .then((data) => data.json())
            .catch((error) => console.log(error));
}
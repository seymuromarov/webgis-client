import axios from 'axios'

export default() => {
    const getUrl = window.location;
    let baseUrl = 'https://' + getUrl.hostname + ":7777";

    return axios.create({
        // baseURL: `http://webgis.azercosmos.az`,
        baseURL: `${baseUrl}/arcgis/rest/services`,
        withCredentials: false,
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json'
        }
    })
}

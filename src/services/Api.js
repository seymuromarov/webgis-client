import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `http://webgis.azercosmos.az`,
        withCredentials: false,
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json'
        }
    })
}

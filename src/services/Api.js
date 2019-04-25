import axios from 'axios'
import {baseUrl} from "../config/baseUrl";

export default() => {

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

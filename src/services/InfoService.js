import request from "../utils/request";
import { URL } from "../config/urls";

export default {
    getFAQ() {
        return request.get(URL + "/api/faq");
    },
    getReleaseNotes() {
        return request.get(URL + "/api/releasenote");
    },
    sendMessage(body) {
        return request.post(URL + "/api/mail/contact-us", body);
    }
};

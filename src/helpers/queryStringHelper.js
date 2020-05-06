import qs from "qs";
const functions = {
    formatQueryString(params) {
        return qs.stringify(
            params,
            {
                arrayFormat: "indices",
                allowDots: true,
            }
        );
    },
};
export default { ...functions };

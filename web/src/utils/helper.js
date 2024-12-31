import AppStorage from "utils/storage";

export const GenerateUniqueId = (length = 6) => {
    return Math.random().toString(36).substring(2, length+2);
};

export const GetIp = () => {
    return fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                AppStorage.SetItem('country', res.countryCode?.toLowerCase());
            }
        });
};

export const HandleURLQueries = (router, path) => {
    if (Object.keys(router.query).length && path) {
        const arr = Object.keys(router.query)

        return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]]) && path !== '/'
    }

    return false
}

const Helper = {
    GenerateUniqueId,
    GetIp,
    HandleURLQueries
};

export default Helper;

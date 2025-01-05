import Api from "utils/api";

const getPagesByQuery = (query) => {
    return Api.Instance.get('/page', {params: query}).then(res => res.data);
};

const createPage = (params) => {
    return Api.Instance.post('/page', params);
};

const updatePage = (id, params) => {
    return Api.Instance.patch(`/page/${id}`, params);
}

const deletePage = (id) => {
    return Api.Instance.delete(`/page/${id}`);
}

const PageService = {
    getPagesByQuery,
    createPage,
    updatePage,
    deletePage
};

export default PageService;

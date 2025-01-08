import Api from "utils/api";

const getPagesByQuery = (query) => {
    return Api.Instance.get('/page', {params: query}).then(res => res.data?.data);
};

const createPage = (params) => {
    return Api.Instance.post('/page', params);
};

const getPageById = (id) => {
    return Api.Instance.get(`/page/${id}`).then(res => res.data);
}

const getPageBySlug = (slug) => {
    return Api.Instance.get(`/page/${slug}`).then(res => res.data);
}


const updatePage = (id, params) => {
    return Api.Instance.patch(`/page/${id}`, params);
}

const deletePage = (id) => {
    return Api.Instance.delete(`/page/${id}`);
}

const PageService = {
    getPagesByQuery,
    getPageById,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage
};

export default PageService;

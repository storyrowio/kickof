import Api from "utils/api";

const getProjectsByQuery = (query) => {
    return Api.Instance.get('/project', {params: query})
        .then(res => res.data?.data);
};

const createProject = (params) => {
    return Api.Instance.post('/project', params);
};

const getProjectById = (id) => {
    return Api.Instance.get(`/project/${id}`)
        .then(res => res.data?.data);
};

const getProjectByCode = (code) => {
    return Api.Instance.get(`/project/${code}`)
        .then(res => res.data);
};

const getProjectMember = (id) => {
    return Api.Instance.get(`/project/members/${id}`).then(res => res.data);
};

const updateProject = (id, params) => {
    return Api.Instance.patch(`/project/${id}`, params)
        .then(res => res.data);
};

const ProjectService = {
    getProjectsByQuery,
    createProject,
    getProjectById,
    getProjectByCode,
    getProjectMember,
    updateProject
};

export default ProjectService;

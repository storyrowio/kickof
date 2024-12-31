import Api from "utils/api";

const GetRoleByQuery = (query) => {
    return Api.Instance.get('/role', {params: query})
        .then(res => res?.data?.data);
};

const GetRoleById = (id) => {
    return Api.Instance.get(`/role/${id}`)
        .then(res => res?.data?.data);
};

const CreateRole = (id) => {
    return Api.Instance.post('/role')
        .then(res => res?.data?.data);
};

const UpdateRole = (id, params) => {
    return Api.Instance.patch(`/role/${id}`, params)
        .then(res => res?.data?.data);
};

const DeleteRole = (ids) => {
    return Api.Instance.delete(`/role/${ids}`)
        .then(res => res?.data?.data);
};

const RoleService = {
    GetRoleByQuery,
    GetRoleById,
    CreateRole,
    UpdateRole,
    DeleteRole
};

export default RoleService;
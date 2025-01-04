import Api from "utils/api";

const getTasksByQuery = (query) => {
    return Api.Instance.get('/task', {params: query}).then(res => res.data);
};

const createTask = (params) => {
    return Api.Instance.post('/task', params);
};

const updateTask = (id, params) => {
    return Api.Instance.patch(`/task/${id}`, params);
}

const deleteTask = (id) => {
    return Api.Instance.delete(`/task/${id}`);
}

const TaskService = {
    getTasksByQuery,
    createTask,
    updateTask,
    deleteTask
};

export default TaskService;

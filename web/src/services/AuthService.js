import Api from "utils/api";
import AppStorage from "utils/storage";
import {AUTH_TOKEN} from "constants/storage";

const Login = (params) => {
    return Api.Instance.post('/login', params)
        .then(res => {
            AppStorage.SetItem(AUTH_TOKEN, res.data?.data?.token);
            return res
        }).catch(err => {
            console.log('Error login', err);
            return err
        });
};

const Register = (params) => {
    return Api.Instance.post('/register', params)
        .then(res => {
            console.log('Result ', res.data)
            AppStorage.SetItem(AUTH_TOKEN, res.data?.data?.token);
            return res
        });
};

const GetProfile = () => {
    return Api.Instance.get('/profile').then(res => res.data?.data);
};

const Logout = () => {
    return AppStorage.RemoveItem(AUTH_TOKEN);
};

const UpdatePassword = async (params) => {
    params.token = await AppStorage.GetItem(AUTH_TOKEN);
    return Api.Instance.post('/update-password', params);
};

const AuthService = {
    Login,
    Register,
    GetProfile,
    Logout,
    UpdatePassword
}

export default AuthService;

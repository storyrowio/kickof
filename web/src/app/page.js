import LoginForm from "components/pages/auth/LoginForm";
import getConfig from 'next/config'
import {Env} from "utils/env";

// const { publicRuntimeConfig } = getConfig()

export default function Home() {
    return <LoginForm/>;
}

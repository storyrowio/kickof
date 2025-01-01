import LoginForm from "components/pages/auth/LoginForm";
import getConfig from 'next/config'
import {Env} from "utils/env";

// const { publicRuntimeConfig } = getConfig()

export default function Home() {
  // console.log("Public", publicRuntimeConfig)
  // const runtime = publicRuntimeConfig?.NEXT_PUBLIC_API_URL
  const apiUrl = Env.NEXT_PUBLIC_API_URL

  console.log("Api Url: ", apiUrl)
  return <LoginForm/>;
}

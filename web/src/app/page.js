import LoginForm from "components/pages/auth/LoginForm";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  console.log("Api Url: ", apiUrl)
  return <LoginForm/>;
}

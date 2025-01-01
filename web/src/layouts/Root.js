'use client'

import {useParams, usePathname} from "next/navigation";
import {useDispatch, useSelector} from "store";
import Theme from "theme";
import {SessionProvider} from "next-auth/react";
import BlankLayout from "layouts/BlankLayout";
import {Suspense, useEffect} from "react";
import Helper from "utils/helper";
import AuthLayout from "layouts/auth/AuthLayout";
import AppLayout from "layouts/app/AppLayout";
import WorkspaceService from "services/WorkspaceService";
import AuthService from "services/AuthService";
import {AppActions} from "store/slices/AppSlice";
import ProjectService from "services/ProjectService";

const RootApp = ({ children, ...props }) => {
    console.log("Props", props);
    const pathname = usePathname();
    const params = useParams();
    const dispatch = useDispatch();
    const themeSetting = useSelector(state => state.theme);

    const fetchWorkspace = async () => {
        if (params?.workspaceCode) {
            if (resWorkspace?.data.length > 0 && !params?.workspaceCode) {
                dispatch(AppActions.setWorkspace(resWorkspace?.data[0]));

            }
        }
    };

    const fetch = () => {
        setTimeout(async () => {
            await AuthService.GetProfile()
                .then(async (res) => {
                    await WorkspaceService.getWorkspacesByQuery({userId: res?.id})
                        .then(async (resWorkspace) => {
                            dispatch(AppActions.setWorkspaces(resWorkspace?.data));
                        })
                })
        }, 3000);
    };

    let Layout = BlankLayout;

    if (pathname === '/' || pathname === '/register') {
        Layout = AuthLayout;
    } else if (pathname.includes('/app')) {
        Layout = AppLayout;
    }

    useEffect(() => {
        Helper.GetIp();
        fetch();
    }, []);

    return (
        <Suspense>
            <SessionProvider>
                <Theme mode={themeSetting.mode}>
                    <Layout>
                        {children}
                    </Layout>
                </Theme>
            </SessionProvider>
        </Suspense>
    )
}

export function getServerSideProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    console.log('Api url from server', apiUrl)
    return {
        props: { apiUrl },
    }
}

export default RootApp;

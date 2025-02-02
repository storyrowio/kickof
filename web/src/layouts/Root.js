'use client'

import {useParams, usePathname, useRouter} from "next/navigation";
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
import {ThemeActions} from "store/slices/ThemeSlice";
import PageLayout from "layouts/PageLayout";

const RootApp = ({ children }) => {
    const pathname = usePathname();
    const params = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const themeSetting = useSelector(state => state.theme);

    const fetch = () => {
        setTimeout(async () => {
            await AuthService.GetProfile()
                .then(async (res) => {
                    dispatch(AppActions.addLoadedData('Profile'));

                    if (res?.id) {
                        await WorkspaceService.getWorkspacesByQuery({user: res?.id})
                            .then(async (resWorkspace) => {
                                dispatch(AppActions.addLoadedData('Workspaces'));

                                if (resWorkspace?.data?.length === 0) {
                                    dispatch(ThemeActions.setShowOnboardingDialog(true));
                                } else {
                                    dispatch(AppActions.setWorkspaces(resWorkspace?.data));

                                    if (!params.workspaceCode && resWorkspace?.data?.length > 0) {
                                        dispatch(AppActions.setWorkspace(resWorkspace?.data[0]));
                                        dispatch(AppActions.addLoadedData('Workspace'));

                                        await ProjectService.getProjectsByQuery({workspace: resWorkspace?.data[0].id})
                                            .then(resProject => {
                                                if (resProject?.data?.length > 0) {
                                                    dispatch(AppActions.setProjects(resProject?.data));
                                                }
                                            })

                                        if (pathname === '/' || pathname === '/app') {
                                            router.push(`/app/${resWorkspace.data[0]?.code}`);
                                        }
                                    }
                                }
                            })
                    }
                }).catch(() => {
                    dispatch(AppActions.addLoadedData('Profile'));
                })
        }, 3000);
    };

    let Layout = BlankLayout;

    if (pathname === '/' || pathname === '/register') {
        Layout = AuthLayout;
    } else if (pathname.includes('/app')) {
        Layout = AppLayout;
    } else if (pathname.startsWith('/page')) {
        Layout = PageLayout;
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

export default RootApp;

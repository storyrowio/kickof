import AppNavbar from "layouts/app/components/navbar/AppNavbar";
import {Box, CircularProgress, Stack, styled, useMediaQuery} from "@mui/material";
import AppSidebar from "layouts/app/components/sidebar/AppSidebar";
import {useDispatch, useSelector} from "store";
import {useEffect, useRef, useState} from "react";
import {AppActions} from "store/slices/AppSlice";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import RightSidebar from "layouts/app/components/sidebar/RightSidebar";
import AppStorage from "utils/storage";
import ProjectService from "services/ProjectService";
import {ThemeActions} from "store/slices/ThemeSlice";

const LayoutWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
}));

const MainContentWrapper = styled(Box)(({ theme, isSidebarCollapsed }) => ({
    flexGrow: 1,
    minWidth: 0,
    background: theme.palette.background.default,
    width: isSidebarCollapsed ? '100vw' : '100%',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    marginRight: 'auto',
    padding: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    },

    [theme.breakpoints.up('xl')]: {
        // width: '80%',
        // margin: 'auto',
    }
}))

export default function AppLayout({ children }) {
    const params = useParams();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { isSidebarCollapsed } = useSelector(state => state.theme);
    const { workspaces, workspace, projects, project } = useSelector(state => state.app);
    const [loading, setLoading] = useState(true);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            if (mobile) {
                dispatch(ThemeActions.setSidebarCollapse(true));
                mounted.current = true;
            }
        }
    }, [mobile]);

    const redirectToWorkspace = () => {
        console.log(workspaces)
        router.push(`/app/${workspaces[0].code}`);
        setLoading(false);

        mounted.current = true;
    };

    const fetchCurrentWorkspace = async () => {
        if (params?.workspaceCode) {
            const currentWorkspace = workspaces?.find(e => e.code === params?.workspaceCode);
            dispatch(AppActions.setWorkspace(currentWorkspace));
            return ProjectService.getProjectsByQuery({workspace: currentWorkspace?.id})
                .then((resProject) => {
                    dispatch(AppActions.setProjects(resProject?.data));
                })
        }
    };

    const fetchCurrentProject = () => {
        if (params?.projectId) {
            dispatch(AppActions.setProject(projects?.find(e => e.id === params?.projectId)));
        }
    };

    useEffect(() => {
        if (params?.projectId && projects?.length > 0 && !project?.id) {
            fetchCurrentProject();
        }
    }, [params?.projectId, projects]);

    useEffect(() => {
        if (params?.workspaceCode && workspaces?.length > 0 && !workspace?.id) {
            fetchCurrentWorkspace()
        }
    }, [params?.workspaceCode, workspaces]);

    useEffect(() => {
        if (token && pathname.includes('/app')) {
            AppStorage.SetItem('x-token', token);

            redirectToWorkspace();
        }
    }, [token]);

    useEffect(() => {
        setLoading(false);
    }, [params?.workspaceCode]);

    if (loading) {
        return (
            <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100vh' }}>
                <CircularProgress/>
            </Stack>
        )
    }

    return (
        <LayoutWrapper>
            <AppSidebar/>
            <MainContentWrapper>
                <AppNavbar/>
                <ContentWrapper sx={{
                    ...(isSidebarCollapsed && { width: '100vw' })
                }}>
                    <Box height={80}/>
                    {children}
                </ContentWrapper>
            </MainContentWrapper>
            <RightSidebar/>
        </LayoutWrapper>
    )
}

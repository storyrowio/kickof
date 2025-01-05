import {
    Box,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    List,
    Stack,
    styled,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import Link from "next/link";
import Logo from "components/shared/Logo";
import {CloseRounded} from "@mui/icons-material";
import Menus, {ProjectMenus} from "constants/menus";
import SidebarItems from "layouts/app/components/sidebar/components/SidebarItems";
import {CardShadow} from "theme/shadows";
import WorkspaceSection from "layouts/app/components/sidebar/components/WorkspaceSection";
import ProjectList from "layouts/app/components/sidebar/components/ProjectList";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

const MenuHeaderWrapper = styled(Box)(({ theme, width }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(3.5),
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(3.5),
    transition: 'padding .25s ease-in-out',
    minHeight: theme.mixins.toolbar.minHeight,
    position: 'relative'
}))

const FooterWrapper = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    position: 'absolute',
    bottom: 0
}));

export default function AppSidebar() {
    const dispatch = useDispatch();
    const params = useParams();
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const { sidebarWidth, isSidebarCollapsed } = useSelector(state => state.theme);
    const { project } = useSelector(state => state.app);
    const variant = isSidebarCollapsed ? 'persistent' : hidden ? 'temporary' : 'permanent';
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    return (
        <Drawer
            open={!isSidebarCollapsed}
            onClose={() => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed))}
            variant={variant}
            sx={{
                width: isSidebarCollapsed ? 0 : sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    border: 'none',
                    boxShadow: CardShadow,
                    boxSizing: 'border-box',
                },
            }}>
            <MenuHeaderWrapper
                width={sidebarWidth}
                sx={{
                    ...(!hidden && {
                        justifyContent: 'center'
                    })
                }}>
                <Link href={'/app'}>
                    <Logo width={120}/>
                </Link>
                {hidden && (
                    <IconButton onClick={() => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed))}>
                        <CloseRounded/>
                    </IconButton>
                )}
            </MenuHeaderWrapper>
            {/*<Divider/>*/}
            {loading ? (
                <Stack alignItems="center" sx={{ marginTop: 4 }}>
                    <CircularProgress size={20}/>
                </Stack>
            ) : (
                <>
                    <WorkspaceSection/>
                    <Box height={5}/>
                    {/*<Divider/>*/}
                    <List sx={{ pt: 0 }}>
                        <SidebarItems
                            items={project?.id ? ProjectMenus : Menus}/>
                    </List>
                    {!params?.projectId && <ProjectList/>}
                </>
            )}
            <FooterWrapper>
                <Typography variant="caption">KickOf v{process.env.VERSION ?? 'No Version Found'}</Typography>
            </FooterWrapper>
        </Drawer>
    )
}

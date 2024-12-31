import {Box, IconButton, Stack, styled, useMediaQuery} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import {CardShadow} from "theme/shadows";
import Notifications from "layouts/app/components/Notifications";
import Profile from "layouts/app/components/Profile";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    minHeight: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(0, 6)} !important`,

    [theme.breakpoints.down('md')]: {
        padding: `${theme.spacing(0, 2)} !important`,
    }
}))

const Menu = () => {
    return (
        <svg width="35" height="15" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="15" rx="7.5" fill="#424242"/>
            <rect y="32" width="79" height="15" rx="7.5" fill="#424242"/>
            <rect y="65" width="100" height="15" rx="7.5" fill="#424242"/>
            <circle cx="92.5" cy="39.5" r="7.5" fill="#424242"/>
        </svg>
    )
};

export default function AppNavbar() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isSidebarCollapsed, sidebarWidth } = useSelector(state => state.theme);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'));

    return (
        <AppBar
            elevation={0}
            color='default'
            className='layout-navbar'
            sx={{
                width: isSidebarCollapsed || mobile ? '100%' : `calc(100vw - ${sidebarWidth}px)`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                // ...appBarBlurEffect
            }}>
            <Toolbar
                className='navbar-content-container'
                sx={{
                    // ...(appBarBlur && { backdropFilter: 'blur(6px)' }),
                    minHeight: theme => `${theme.mixins.toolbar.minHeight}px !important`,
                    backgroundColor: 'white',
                    // backgroundColor: theme => HexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
                    boxShadow: CardShadow,
                }}>
                <IconButton onClick={() => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed))}>
                    <Menu/>
                </IconButton>
                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    <Notifications />
                    <Profile />
                    {/*<Mode/>*/}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

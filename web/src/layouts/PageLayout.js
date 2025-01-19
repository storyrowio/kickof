import {AppBar, Box, IconButton, Stack, styled, Toolbar} from "@mui/material";
import Logo from "components/shared/Logo";
import {FileDownloadRounded} from "@mui/icons-material";

const Navbar = styled(AppBar)(({theme}) => ({
    backgroundColor: 'transparent',
}));

export default function PageLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar elevation={0}>
                <Toolbar>
                    <Logo height={20}/>
                    <Box flexGrow={1} />
                    <Stack direction="row">
                        <IconButton size="small">
                            <FileDownloadRounded fontSize="small"/>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </Navbar>
            <Box height={40}/>
            {children}
            <Box height={50}/>
        </Box>
    )
}

import {Box, useTheme} from "@mui/material";

export default function BlankLayout({ children }) {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', background: theme.palette.background.default }}>
            {children}
        </Box>
    )
}

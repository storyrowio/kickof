import {Box, Stack, styled, useMediaQuery} from "@mui/material";
import {usePathname} from "next/navigation";
import Logo from "components/shared/Logo";
import {HexToRGBA} from "utils/theme";
import Image from "next/image";

const LeftWrapper = styled(Box)(({ theme }) => ({
    width: '50vw',
    minHeight: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    justifyContent: 'center',
    backgroundColor: HexToRGBA(theme.palette.primary.dark, 0.04),
    margin: theme => theme.spacing(8, 0, 8, 8),
    position: 'relative',
}));

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 450
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 600
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 750
    }
}));


const BlobBackground = () => {
    return (
        <Box sx={{ height: '94%', position: 'absolute' }}>
            <svg width="100%" height="100%" viewBox="0 0 1281 1316" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M879.529 230.109C944.775 308.644 930.995 426.323 991.512 508.558C1070.93 616.471 1284.91 641.639 1280.95 775.58C1277.11 905.329 1081.29 928.838 976.81 1005.83C902.767 1060.39 835.506 1115.47 756.289 1162.19C656.119 1221.28 567.3 1315.11 451.012 1315.98C326.194 1316.92 178.545 1274.91 115.714 1167.02C51.541 1056.83 166.315 919.492 146.715 793.485C128.138 674.056 -34.9612 580.363 6.81948 466.952C48.1664 354.718 231.089 390.215 323.324 314.091C427.827 227.842 436.502 21.9854 570.467 1.75794C699.727 -17.7592 795.977 129.541 879.529 230.109Z"
                    fill="white" fillOpacity="0.6"/>
            </svg>
        </Box>
    )
};

export default function AuthLayout({ children }) {
    const pathname = usePathname();
    const illustration = pathname.includes('register') ? 'auth-register' : 'auth-login';
    const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

    return (
        <Stack direction="row" sx={{minHeight: '100vh', backgroundColor: 'background.paper', padding: 5}}>
            {!hidden ? (
                <LeftWrapper>
                    <BlobBackground/>
                    <Box sx={{
                        width: '65%',
                        height: '90%',
                        position: 'relative'
                    }}>
                        <Image
                            src={`/images/illustrations/${illustration}.svg`}
                            alt={illustration}
                            fill
                            style={{ objectFit: "contain" }}/>
                    </Box>
                </LeftWrapper>
            ) : null}
            <RightWrapper>
                <Box
                    sx={{
                        p: [6, 12],
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <Logo width={200} height={80}/>
                        {children}
                    </Box>
                </Box>
            </RightWrapper>
        </Stack>
    )
}

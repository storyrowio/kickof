import {Box, Card, CardContent, styled, Typography} from "@mui/material";
import Image from "next/image";
import {HexToRGBA} from "utils/theme";
import {useTheme} from "@mui/material/styles";

const IconBox = styled(Box)(({ theme, color }) => ({
    width: 60,
    height: 60,
    backgroundColor: theme.palette[color].main,
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function DashboardWidget(props) {
    const { color, content, icon, title } = props;
    const theme = useTheme();

    return (
        <Box sx={{ position: 'relative' }}>
            <IconBox color={color}>
                <Image src={icon} alt="title" width={30} height={30}/>
            </IconBox>
            <Box sx={{ height: 20 }}/>
            <Card sx={{ background: HexToRGBA(theme.palette[color].main, 0.16)  }} elevation={0}>
                <CardContent>
                    <Typography sx={{ color: theme.palette[color].dark }}>{title}</Typography>
                    <Typography sx={{ color: theme.palette[color].main, fontWeight: 600 }} variant="h1">{content}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

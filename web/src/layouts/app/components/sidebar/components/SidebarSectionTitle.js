import {ListSubheader, Typography} from "@mui/material";

export default function SidebarSectionTitle({ title }) {
    return (
        <ListSubheader
            sx={{
                height: 38,
                px: 7.5,
                '& .MuiTypography-root, & svg': {
                    color: 'text.secondary',
                }
            }}>
            <Typography noWrap variant='caption' sx={{ textTransform: 'uppercase' }}>
                {title}
            </Typography>
        </ListSubheader>
    )
}

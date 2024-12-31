import {styled} from "@mui/material/styles";
import {ListItemButton} from "@mui/material";

const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
    width: '100%',
    height: 40,
    paddingY: 0,
    borderRadius: 8,
    transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '&.Mui-selected, &.Mui-selected:hover': {
        color: theme.palette.common.white,
        // backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTypography-root': {
        fontWeight: 500,
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    },
    '& svg': {
        color: theme.palette.text.secondary
    }
}));

export default MenuNavLink;

import {Box, styled} from "@mui/material";

const MenuItemTextMetaWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
}))

export default MenuItemTextMetaWrapper;

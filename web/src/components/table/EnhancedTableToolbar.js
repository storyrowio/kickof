import {
    Box, Button,
    FormLabel,
    IconButton,
    InputAdornment,
    Menu, MenuItem, Select, Stack,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {DeleteRounded, FilterListRounded, SearchRounded} from "@mui/icons-material";
import {useState} from "react";
import PropTypes from "prop-types";
import {BasicSort} from "constants/constants";
import {useTheme} from "@mui/material/styles";
import {HexToRGBA} from "utils/theme";

const EnhancedTableToolbar = (props) => {
    const {
        children,
        filter,
        handleChange,
        numSelected,
        onDelete,
        sortItems } = props;
    const theme = useTheme();
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [tempFilter, setTempFilter] = useState(filter);

    const handleSearch = (e) => {
        setTempFilter({ ...filter, keyword: e.target.value});
        handleChange({...filter, keyword: e.target.value});
    };

    return (
        <Toolbar
            sx={{
                borderRadius: 1,
                ...(numSelected > 0 && {
                    background: HexToRGBA(theme.palette.error.light, 0.2),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="error" variant="subtitle2" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{ flex: '1 1 100%' }}>
                    <TextField
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ marginRight: 0 }}>
                                        <SearchRounded fontSize="small"/>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        placeholder="Type your keyword ..."
                        size="small"
                        onChange={(e) => handleSearch(e)}
                        value={tempFilter.keyword}
                    />
                </Box>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteRounded color="error" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter">
                    <Button
                        startIcon={<FilterListRounded/>}
                        variant="outlined"
                        onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
                        Filter
                    </Button>
                </Tooltip>
            )}
            <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => setFilterAnchorEl(null)}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            minWidth: 250,
                            padding: 2,
                            borderRadius: 1,
                            overflow: 'visible',
                            mt: 1.5,
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Stack spacing={4} padding={2}>
                    <Box>
                        <FormLabel sx={{ fontSize: 12 }}>Sort By</FormLabel>
                        <Select
                            fullWidth
                            size="small"
                            onChange={(e) => setTempFilter({...filter, sort: e.target.value})}
                            value={tempFilter.sort}>
                            {Object.keys(sortItems || BasicSort).map(key => (
                                <MenuItem key={key} value={(sortItems || BasicSort)[key].value}>
                                    {(sortItems || BasicSort)[key].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {children}

                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            handleChange(tempFilter);
                            setFilterAnchorEl(null);
                        }}>
                        Search
                    </Button>
                </Stack>
            </Menu>
        </Toolbar>
    )
};

EnhancedTableToolbar.propTypes = {
    onDelete: PropTypes.func
};

export default EnhancedTableToolbar;

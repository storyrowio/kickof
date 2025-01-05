'use client'

import Breadcrumb from "components/shared/Breadcrumb";
import {useSelector} from "store";
import {useState} from "react";
import {DefaultSort} from "constants/constants";
import {
    Card,
    CardContent,
    CircularProgress,
    Fab, IconButton,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Tooltip
} from "@mui/material";
import {Pagination} from "@mui/lab";
import {AddRounded, EditRounded} from "@mui/icons-material";
import DeleteConfirmDialog from "components/dialogs/DeleteConfirmDialog";
import EnhancedTableToolbar from "components/table/EnhancedTableToolbar";
import CustomCheckbox from "components/forms/CustomCheckbox";
import CustomChip from "components/chip/CustomChip";
import Roles from "constants/role";
import {usePathname} from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import StateService from "services/StateService";
import PageService from "services/PageService";

export default function ProjectPage() {
    const pathname = usePathname();
    const { project, workspace } = useSelector(state => state.app);
    const [selectedItems, setSelectedItems] = useState([]);
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const { data: resPage, isLoading: loading, mutate } = useSWR(
        project?.id ? '/api/page' : null,
        () => PageService.getPagesByQuery({
            project: project?.id,
            sort: DefaultSort.oldest.value
        })
    );

    const handleSelectItems = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(e => e !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <>
            <Breadcrumb
                title="Pages"
                items={[
                    {title: 'Home', to: `/app/${workspace?.code}/project/${project?.id}`},
                    {title: 'List of project pages'}
                ]}/>

            <Card>
                <CardContent>
                    <EnhancedTableToolbar
                        filter={filter}
                        numSelected={selectedItems.length}
                        handleChange={(newFilter) => setFilter({...filter, ...newFilter})}
                        sortItems={DefaultSort}
                        onDelete={() => setDeleteConfirm(true)}/>
                    {loading || false ? (
                        <Stack alignItems="center">
                            <CircularProgress size={36}/>
                        </Stack>
                    ) : (
                        <>
                            <TableContainer>
                                <Table sx={{ whiteSpace: 'nowrap' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={50}/>
                                            <TableCell>Title</TableCell>
                                            <TableCell align="right">Option</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {resPage?.data?.length > 0 ? resPage?.data?.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox
                                                        color="primary"
                                                        checked={selectedItems.includes(row.id)}
                                                        onChange={() => handleSelectItems(row.id)}/>
                                                </TableCell>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Preview">
                                                        <IconButton>
                                                            <EditRounded fontSize="small" sx={{ color: 'text.secondary'}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center">No Data</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Stack direction="row" paddingTop={3} justifyContent="end">
                                <Pagination
                                    color="primary"
                                    count={resPage?.pagination?.count}
                                    page={resPage?.pagination?.page}
                                    // count={resData?.pagination?.pages ?? 1}
                                    // page={resData?.pagination?.currentPage}
                                    size="small" />
                            </Stack>
                        </>
                    )}
                </CardContent>
            </Card>

            <Link href={`${pathname}/create`}>
                <Tooltip title="Add Data">
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ position: "fixed", right: "25px", bottom: "15px" }}>
                        <AddRounded />
                    </Fab>
                </Tooltip>
            </Link>

            <DeleteConfirmDialog
                open={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
                onSubmit={() => {}}/>
        </>
    )
}

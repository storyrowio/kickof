'use client'

import {useFormik} from "formik";
import {
    Box,
    Button,
    Card,
    CardContent, CardHeader,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    FormLabel, IconButton, MenuItem, Select,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import {AddRounded, EditRounded} from "@mui/icons-material";
import {useState} from "react";
import {SketchPicker} from "react-color";
import useSWR from "swr";
import {useSelector} from "store";
import {useParams} from "next/navigation";
import {DefaultSort} from "constants/constants";
import TaskLabelService from "services/TaskLabelService";
import ProjectService from "services/ProjectService";
import RoleService from "services/RoleService";

export default function ProjectMemberSection() {
    const params = useParams();
    const { data: resData } = useSWR(
        (params?.projectId) ? '/api/project/members' : null,
        () => ProjectService.getProjectMember(params?.projectId));
    const { data: resRoles } = useSWR(
        (params?.projectId) ? '/api/role' : null,
        () => RoleService.GetRoleByQuery());

    const [form, setForm] = useState({open: false, data: null});

    const handleSubmit = () => {
        console.log(form.data)
    };
    console.log(resRoles)
    return (
        <>
            <Card sx={{
                width: { xs: '100%', lg: '50%' }
            }}>
                <CardHeader
                    action={
                        <Button
                            size="small"
                            startIcon={<AddRounded/>}
                            variant="contained"
                            onClick={() => setForm({open: true, data: null})}>
                            Add Member
                        </Button>
                    }
                    title="Members"
                />
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Member</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resData?.data?.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Typography variant="subtitle2">{e.name}</Typography>
                                            <Typography variant="caption">{e.email}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="text" onClick={() => setForm({open: true, data: e})}>
                                                <EditRounded fontSize="small"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={form.open} onClose={() => setForm({open: false, data: null})}>
                <DialogTitle>Form Task Label</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <Box>
                            <FormLabel>Name</FormLabel>
                            <TextField
                                fullWidth
                                readOnly
                                name="label"
                                value={form.data?.name}/>
                        </Box>
                        <Box>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                fullWidth
                                readOnly
                                value={form.data?.email}/>
                        </Box>
                        <Box>
                            <FormLabel>Role</FormLabel>
                            <Select
                                fullWidth
                                onChange={(e) => setForm({...form, data: {...form.data, roleId: e.target.value}})}>
                                {resRoles?.data?.map((e, i) => (
                                    <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={() => setForm({open: false, data: null})}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
)
}

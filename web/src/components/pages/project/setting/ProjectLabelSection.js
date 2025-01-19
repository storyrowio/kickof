'use client'

import {useFormik} from "formik";
import {
    Box,
    Button,
    Card,
    CardContent, CardHeader,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    FormLabel, IconButton,
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
import {DefaultSort, LabelSort} from "constants/constants";
import TaskLabelService from "services/TaskLabelService";

export default function ProjectLabelSection() {
    const params = useParams();
    const { workspace, project } = useSelector(state => state.app);
    const { data: resData, isLoading: loading, mutate } = useSWR(
        (params?.workspaceCode && workspace?.id) ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({workspace: workspace?.id, sort: LabelSort.label.value}));

    const [form, setForm] = useState({open: false, data: null});
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const submit = () => {
        form.data.workspaceId = workspace.id;
        form.data.projectId = project.id;

        if (form.data?.id) {
            return TaskLabelService.updateTaskLabel(form?.data?.id, form.data)
        }

        return TaskLabelService.createTaskLabel(form.data);
    };

    const handleSubmit = () => {
        setLoadingSubmit(true);

        return submit().then(() => {
            setForm({open: false, data: null});
            setLoadingSubmit(false);
            mutate();
        });
    };

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
                            Add Label
                        </Button>
                    }
                    title="Task Labels"
                />
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Label</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resData?.data?.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Stack direction="row" spacing={4}>
                                                <Box sx={{
                                                    width: 40,
                                                    height: 20,
                                                    borderRadius: 0.5,
                                                    background: e.color ?? '#000'
                                                }}/>
                                                <Typography variant="subtitle2">{e.label}</Typography>
                                            </Stack>
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
                            <FormLabel>Label</FormLabel>
                            <TextField
                                fullWidth
                                name="label"
                                onChange={(e) => setForm({...form, data: {...form.data, label: e.target.value}})}
                                value={form.data?.label}/>
                        </Box>
                        <Box>
                            <FormLabel>Color</FormLabel>
                            <TextField
                                fullWidth
                                value={form.data?.color}/>
                            <SketchPicker
                                color={form.data?.color}
                                onChangeComplete={(color) => setForm({...form, data: {...form.data, color: color.hex}})}/>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={() => setForm({open: false, data: null})}>
                        Cancel
                    </Button>
                    <Button disabled={loadingSubmit} variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
)
}

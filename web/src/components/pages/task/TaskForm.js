import {useFormik} from "formik";
import {
    Box,
    Button,
    FormLabel,
    Grid2, IconButton,
    MenuItem,
    Select,
    Stack,
    styled,
    TextField,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useDispatch, useSelector} from "store";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {CloseRounded} from "@mui/icons-material";
import QuillEditor from "components/forms/Editor/QuillEditor";
import moment from "moment";
import useSWR from "swr";
import StateService from "services/StateService";
import {DefaultSort} from "constants/constants";
import TaskLabelService from "services/TaskLabelService";
import {Autocomplete} from "@mui/lab";
import ProjectService from "services/ProjectService";
import TaskService from "services/TaskService";
import {useEffect, useRef, useState} from "react";
import DeleteConfirmDialog from "components/dialogs/DeleteConfirmDialog";
import {ThemeActions} from "store/slices/ThemeSlice";

const FormWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10)
}));

export default function TaskForm(props) {
    const { data, states, mutate, onClose } = props;
    const dispatch = useDispatch();
    const { project, workspace } = useSelector(state => state.app);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const { data: resLabels } = useSWR(
        project?.id ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({
            project: project?.id,
            sort: DefaultSort.name.value
        })
    )

    const { data: resMembers } = useSWR(
        project?.id ? '/api/member' : null,
        () => ProjectService.getProjectMember(project?.id)
    )

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            description: data?.description ?? '',
            stateId: data?.stateId ?? '',
            startDate: data?.startDate && moment(data?.startDate).get('year') !== 1 ? moment(data?.startDate) : null,
            endDate: data?.endDate && moment(data?.endDate).get('year') !== 1 ? moment(data?.endDate) : null,
            labelIds: data?.labels ?? [],
            assigneeIds: data?.assignees ?? [],
        },
        onSubmit: values => handleSubmit(values)
    });

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && data?.id) {
            formik.setValues(data);
            mounted.current = true;
        }
    }, [data]);

    const handleSuccess = () => {
        mutate();
        dispatch(ThemeActions.setRightSidebarOpen(false));
        dispatch(ThemeActions.setRightSidebarContent(null));
    };

    const submit = (params) => {
        if (data?.id) {
            return TaskService.updateTask(data?.id, params);
        }

        return TaskService.createTask(params);
    }

    const handleSubmit = (values) => {
        const params = {
            ...values,
            labelIds: values?.labelIds?.map(e => e.id),
            assigneeIds: values?.assigneeIds?.map(e => e.id),
            projectId: project?.id,
            workspaceId: workspace?.id,
        };

        return submit(params)
            .then(() => handleSuccess());
    }

    const handleDelete = () => {
        return TaskService.deleteTask(data?.id)
            .then(() => handleSuccess());
    }

    return (
        <FormWrapper>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ marginBottom: 3 }}>Task Form</Typography>
                {mobile && (
                    <IconButton onClick={onClose}>
                        <CloseRounded/>
                    </IconButton>
                )}
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <FormLabel>Title</FormLabel>
                        <TextField
                            fullWidth
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            error={Boolean(formik.errors.title)}
                            helperText={formik.errors.title}/>
                    </Box>
                    <Box>
                        <FormLabel>Description</FormLabel>
                        <QuillEditor
                            onChange={(value) => formik.setFieldValue('description', value)}
                            value={formik.values.description}/>
                    </Box>
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, lg: 6, xl: 6 }}>
                            <FormLabel>Start Date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDatePicker
                                    fullWidth
                                    slotProps={{ textField: { fullWidth: true } }}
                                    value={formik.values.startDate}
                                    onChange={(newValue) => formik.setFieldValue('startDate', newValue)}
                                />
                            </LocalizationProvider>
                        </Grid2>
                        <Grid2 size={{ xs: 12, lg: 6, xl: 6 }}>
                            <FormLabel>End Date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDatePicker
                                    fullWidth
                                    slotProps={{ textField: { fullWidth: true } }}
                                    value={formik.values.endDate}
                                    onChange={(newValue) => formik.setFieldValue('endDate', newValue)}
                                />
                            </LocalizationProvider>
                        </Grid2>
                    </Grid2>
                    <Box>
                        <FormLabel>State</FormLabel>
                        <Select
                            fullWidth
                            name="stateId"
                            onChange={formik.handleChange}
                            value={formik.values.stateId}
                            error={Boolean(formik.errors.stateId)}
                            helperText={formik.errors.stateId}>
                            {states?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel>Labels</FormLabel>
                        <Autocomplete
                            multiple
                            options={resLabels?.data}
                            getOptionLabel={(option) => option.label}
                            value={formik.values?.labelIds}
                            onChange={(e, val) =>
                                formik.setFieldValue('labelIds', val)}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"/>
                            )}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Assignees</FormLabel>
                        <Autocomplete
                            multiple
                            options={resMembers?.data}
                            getOptionLabel={(option) => option.name}
                            value={formik.values?.assigneeIds}
                            onChange={(e, val) =>
                                formik.setFieldValue('assigneeIds', val)}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"/>
                            )}
                        />
                    </Box>
                    <Stack direction="row" justifyContent="end" spacing={3} sx={{ paddingTop: 4 }}>
                        {data?.id && (
                            <Button
                                color="error"
                                variant="contained"
                                type="button"
                                onClick={() => setDeleteConfirm(true)}>
                                Delete Task
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>

            <DeleteConfirmDialog
                open={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
                onSubmit={handleDelete}/>
        </FormWrapper>
    )
}

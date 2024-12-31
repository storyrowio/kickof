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
import {useSelector} from "store";
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

const FormWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10)
}));

export default function TaskForm(props) {
    const { data, states, onSuccess, onClose } = props;
    const { project, workspace } = useSelector(state => state.app);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const { data: resLabels } = useSWR(
        project?.id ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({
            project: project?.id,
            sort: DefaultSort.name.value
        })
    )

    const { data: resMembers } = useSWR(
        project?.id ? '/api/member' : null,
        () => TaskLabelService.getTaskLabelsByQuery({
            project: project?.id,
            sort: DefaultSort.name.value
        })
    )

    console.log(resLabels?.data)
    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            description: data?.description ?? '',
            stateId: data?.stateId ?? '',
            startDate: moment(data?.startDate).get('year') !== 1 ? moment(data?.startDate) : null,
            endDate: moment(data?.endDate).get('year') !== 1 ? moment(data?.endDate) : null,
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        const params = {
            ...values,
            projectId: project?.id,
            workspaceId: workspace?.id,
        };
        console.log(params);
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
                            defaultValue={formik.values?.labelId}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"/>
                            )}
                        />
                    </Box>
                    <Stack alignItems="end">
                        <Button
                            variant="contained"
                            type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </FormWrapper>
    )
}

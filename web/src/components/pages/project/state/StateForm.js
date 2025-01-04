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
import {StateType} from "constants/constants";
import StateService from "services/StateService";

const FormWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10)
}));

export default function StateForm(props) {
    const { data, onSuccess, onClose } = props;
    const { project, workspace } = useSelector(state => state.app);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const formik = useFormik({
        initialValues: {
            name: data?.name ?? '',
            type: data?.type ?? ''
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        const params = {
            ...values,
            projectId: project?.id,
            workspaceId: workspace?.id,
        };

        return StateService.createState(params)
            .then(res => {
                if (res) {
                    onSuccess();
                }
            });
    }

    return (
        <FormWrapper>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ marginBottom: 3 }}>State Form</Typography>
                {mobile && (
                    <IconButton onClick={onClose}>
                        <CloseRounded/>
                    </IconButton>
                )}
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <FormLabel>Name</FormLabel>
                        <TextField
                            fullWidth
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}/>
                    </Box>
                    <Box>
                        <FormLabel>Type</FormLabel>
                        <Select
                            fullWidth
                            name="type"
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            error={Boolean(formik.errors.type)}
                            helperText={formik.errors.type}>
                            {Object.keys(StateType).map(key => (
                                <MenuItem key={key} value={key}>
                                    {StateType[key].name}
                                </MenuItem>
                            ))}
                        </Select>
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

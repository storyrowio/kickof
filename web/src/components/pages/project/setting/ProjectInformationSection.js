import {useFormik} from "formik";
import {Box, Button, Card, CardContent, CardHeader, FormLabel, Stack, TextField} from "@mui/material";
import {useDispatch, useSelector} from "store";
import {AddRounded} from "@mui/icons-material";
import {useState} from "react";
import ProjectService from "services/ProjectService";
import useSWR from "swr";
import TaskLabelService from "services/TaskLabelService";
import {LabelSort} from "constants/constants";
import {AppActions} from "store/slices/AppSlice";

export default function ProjectInformationSection() {
    const dispatch = useDispatch();
    const { project } = useSelector(state => state.app);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const { data: resData, isLoading: loading, mutate } = useSWR(
        (project?.id) ? '/api/project/id' : null,
        () => ProjectService.getProjectById(project?.id), {
            onSuccess: data => {
                dispatch(AppActions.setProject(data));
            }
        });

    const formik = useFormik({
        initialValues: {
            name: resData?.name ?? '',
            description: resData?.description ?? '',
            ...(resData?.id && {...resData})
        },
        enableReinitialize: true,
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        setLoadingSubmit(true);

        return ProjectService.updateProject(project?.id, values).then(() => {
            setLoadingSubmit(false);
            mutate();
        });
    };

    return (
        <Card sx={{
            width: { xs: '100%', lg: '50%' }
        }}>
            <CardHeader title="General Information"/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        <Box>
                            <FormLabel>Project Name</FormLabel>
                            <TextField
                                fullWidth
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={Boolean(formik.errors.name)}
                                helperText={formik.errors.name}/>
                        </Box>
                        <Box>
                            <FormLabel>Description</FormLabel>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={Boolean(formik.errors.description)}
                                helperText={formik.errors.description}/>
                        </Box>
                        <Stack alignItems="end">
                            <Button
                                type="submit"
                                variant="contained">
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

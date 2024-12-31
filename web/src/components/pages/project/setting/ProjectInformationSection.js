import {useFormik} from "formik";
import {Box, Button, Card, CardContent, CardHeader, FormLabel, Stack, TextField} from "@mui/material";
import {useSelector} from "store";
import {AddRounded} from "@mui/icons-material";

export default function ProjectInformationSection() {
    const { project } = useSelector(state => state.app);
    const formik = useFormik({
        initialValues: {
            name: project?.name ?? '',
            description: project?.description ?? ''
        },
        enableReinitialize: true
    });

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

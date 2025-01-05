import {useFormik} from "formik";
import TaskService from "services/TaskService";
import {useSelector} from "store";
import PageService from "services/PageService";
import {Box, Button, Card, CardContent, FormLabel, Stack, TextField} from "@mui/material";
import QuillEditor from "components/forms/Editor/QuillEditor";
import {useRouter} from "next/navigation";

export default function PageForm({ data }) {
    const router = useRouter();
    const { project, workspace } = useSelector(state => state.app);

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            content: data?.content ?? '',
        },
        onSubmit: values => handleSubmit(values)
    });

    const submit = (params) => {
        if (data?.id) {
            return PageService.updatePage(data?.id, params);
        }

        return PageService.createPage(params);
    }

    const handleSubmit = (values) => {
        const params = {
            ...values,
            projectId: project?.id,
            workspaceId: workspace?.id,
        };

        return submit(params)
            .then(() => router.back());
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        <Box>
                            <FormLabel>Title</FormLabel>
                            <TextField
                                fullWidth
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}/>
                        </Box>
                        <Box>
                            <FormLabel>Content</FormLabel>
                            <QuillEditor
                                onChange={(value) => formik.setFieldValue('content', value)}
                                value={formik.values.content}/>
                        </Box>
                        <Stack direction="row" justifyContent="end" spacing={3} sx={{ paddingTop: 4 }}>
                            <Button
                                variant="contained"
                                type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

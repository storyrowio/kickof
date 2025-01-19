'use client'

import {useFormik} from "formik";
import {useSelector} from "store";
import PageService from "services/PageService";
import {Box, Button, Card, CardContent, FormLabel, Stack, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import {DynamicEditor} from "components/forms/BlockNote/DynamicEditor";

export default function PageForm({ data, mutate }) {
    const router = useRouter();
    const { project, workspace } = useSelector(state => state.app);

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            content: data?.content ?? '',
        },
        enableReinitialize: true,
        onSubmit: values => handleSubmit(values)
    });

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && data?.id) {
            formik.setValues(data);
            mounted.current = true;
        }
    }, [data]);

    const handleChangeContent = async (val) => {
        await formik.setFieldValue('content', val);
    }

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
            .then(() => {
                if (mutate) {
                    mutate();
                }
                router.back();
            });
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
                            <Card variant="outlined">
                                <CardContent>
                                    <DynamicEditor
                                        onChangeHtml={async (val) => await handleChangeContent(val)}
                                        value={formik.values.content}/>
                                </CardContent>
                            </Card>
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

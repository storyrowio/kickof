import {
    Box,
    Button,
    Card,
    CardContent,
    FormLabel,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {usePathname, useRouter} from "next/navigation";
import {useFormik} from "formik";
import WorkspaceService from "services/WorkspaceService";
import {WorkspaceSizes} from "constants/constants";

export default function OnboardingForm(props) {
    const { redirectUrl } = props
    const pathname = usePathname();
    console.log(pathname)
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            endpoint: '',
            size: '',
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = values => {
        let finalUrl = `${pathname}/${values.code}`;
        if (redirectUrl) {
            finalUrl = redirectUrl.replace('{workspace}', values.code);
        }
        console.log(finalUrl)
        return WorkspaceService.createWorkspace(values)
            .then(() => router.push(finalUrl));
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4}>
                        <Box>
                            <FormLabel>Workspace Name</FormLabel>
                            <TextField
                                fullWidth
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.name)}
                                {...(formik.errors.name && {helperText: formik.errors.name})}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Workspace Code</FormLabel>
                            <TextField
                                fullWidth
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.code)}
                                {...(formik.errors.code && {helperText: formik.errors.code})}
                            />
                        </Box>
                        {/*<Box>*/}
                        {/*    <FormLabel>Endpoint</FormLabel>*/}
                        {/*    <TextField*/}
                        {/*        fullWidth*/}
                        {/*        name="endpoint"*/}
                        {/*        value={formik.values.endpoint}*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        error={Boolean(formik.errors.endpoint)}*/}
                        {/*        {...(formik.errors.endpoint && {helperText: formik.errors.endpoint})}*/}
                        {/*        slotProps={{*/}
                        {/*            input: {*/}
                        {/*                startAdornment: <InputAdornment position="start">*/}
                        {/*                    {process.env.APP_URL}/*/}
                        {/*                </InputAdornment>,*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Box>*/}
                        <Box>
                            <FormLabel>Size (Number of people)</FormLabel>
                            <Select
                                fullWidth
                                name="size"
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.size)}
                                {...(formik.errors.size && {helperText: formik.errors.size})}
                            >
                                {WorkspaceSizes.map((e, i) => (
                                    <MenuItem key={i} value={e}>
                                        {e}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                            Create Workspace
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}

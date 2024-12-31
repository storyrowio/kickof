'use client'

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormLabel, IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Alert} from "@mui/lab";
import {useFormik} from "formik";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import Roles from "constants/role";
import Link from "next/link";
import {Google, VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import Image from "next/image";
import AuthService from "services/AuthService";

export default function LoginForm() {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const isOwner = pathname.includes('owner');
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        return AuthService.Login(values)
            .then(res => {
                setLoading(false);
                if (res.status === 200) {
                    return router.push('/app');
                }
            }).catch(err => {
                console.log(err.response)
                setError(err.response?.data?.message ?? 'Something wrong!');
            })
    };

    const handleSocialLogin = async (social) => {
        const res = await signIn(social, {
            redirect: false,
            role: isOwner ? Roles.owner.value : Roles.customer.value,
        });
    }

    return (
        <>
            <Box sx={{ my: 6 }}>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                    {`Welcome to Storyrow! 👋🏻`}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Please sign-in to your account and start the adventure
                </Typography>
            </Box>

            {error && (
                <Alert icon={false} severity="error" sx={{ marginBottom: 4 }}>
                    {error}
                </Alert>
            )}

            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 4 }}>
                    <FormLabel>Email Address</FormLabel>
                    <TextField
                        fullWidth
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder='email@example.com'
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}
                        type="email"
                    />
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <FormLabel>Password</FormLabel>
                    <TextField
                        fullWidth
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        placeholder="example123"
                        error={Boolean(formik.errors.password)}
                        helperText={formik.errors.password}
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onMouseDown={e => e.preventDefault()}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityRounded fontSize="small"/> : <VisibilityOffRounded fontSize="small"/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            },
                        }}
                    />
                </Box>
                <Stack direction="row" justifyContent="end" sx={{ marginBottom: 5 }}>
                    <Typography component={Link} href='/forgot-password' sx={{ color: theme.palette.primary.main, fontSize: 14 }}>
                        Forgot Password?
                    </Typography>
                </Stack>
                <Button fullWidth disabled={loading} type='submit' variant='contained' sx={{ mb: 4 }}>
                    Login
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                    <Typography href='/register' component={Link} sx={{ color: theme.palette.primary.main, fontSize: 14 }}>
                        Create an account
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        color: 'text.disabled',
                        '& .MuiDivider-wrapper': { px: 6 },
                        fontSize: theme.typography.body2.fontSize,
                        my: theme => `${theme.spacing(6)} !important`
                    }}
                >
                    or
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        color="primary"
                        startIcon={<Image src="/images/logos/social/google.svg" width={25} height={25} alt="logo"/>}
                        onClick={() => handleSocialLogin('google')}
                        variant="outlined">
                        Login With Google
                    </Button>
                </Box>
            </form>
        </>
    )
}

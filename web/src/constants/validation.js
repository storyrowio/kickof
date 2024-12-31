import * as Yup from 'yup';

export const PasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])/,
        //     'Password must contain both uppercase and lowercase letters'
        // )
        // .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
        // .matches(
        //     /^(?=.*[!@#$%^&*])/,
        //     'Password must contain at least one special character (!@#$%^&*)'
        // ),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
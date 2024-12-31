const palette = (mode = 'light') => {
    const whiteColor = '#FFF'
    const lightColor = '47, 43, 61'
    const darkColor = '208, 212, 241'
    const darkPaperBgColor = '#2F3349'
    const mainColor = lightColor
    const defaultColor = '#BDBDBD'

    const defaultBgColor = () => {
        if (mode === 'light') {
            return '#FDFCFD'
        } else return '#25293C'
    }

    return {
        customColors: {
            dark: `rgba(${darkColor}, 1)`,
            light: lightColor,
            lightPaperBg: whiteColor,
            darkPaperBg: darkPaperBgColor,
            bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C',
            trackBg: mode === 'light' ? '#F1F0F2' : '#363B54',
            avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
            tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072'
        },
        mode: mode,
        common: {
            black: '#000',
            white: whiteColor
        },
        primary: {
            light: '#C5EAE2',
            main: '#02c39a',
            dark: '#3DA891',
            contrastText: whiteColor
        },
        secondary: {
            light: '#C4DEF0',
            main: '#58A3D4',
            dark: '#3084BC',
            contrastText: whiteColor
        },
        default: {
            main: defaultColor,
            light: '#F5F5F5',
            dark: '#424242',
            contrastText: '#212121'
        },
        error: {
            light: '#ED6F70',
            main: '#EA5455',
            dark: '#CE4A4B',
            contrastText: whiteColor
        },
        warning: {
            light: '#FFAB5A',
            main: '#FF9F43',
            dark: '#E08C3B',
            contrastText: whiteColor
        },
        info: {
            light: '#1FD5EB',
            main: '#00CFE8',
            dark: '#00B6CC',
            contrastText: whiteColor
        },
        success: {
            light: '#42CE80',
            main: '#28C76F',
            dark: '#23AF62',
            contrastText: whiteColor
        },
        grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#F5F5F5',
            A200: '#EEEEEE',
            A400: '#BDBDBD',
            A700: '#616161'
        },
        text: {
            primary: `rgba(${mainColor}, 0.78)`,
            secondary: `rgba(${mainColor}, 0.68)`,
            disabled: `rgba(${mainColor}, 0.42)`
        },
        divider: `rgba(${mainColor}, 0.16)`,
        background: {
            paper: mode === 'light' ? whiteColor : darkPaperBgColor,
            default: defaultBgColor()
        },
        action: {
            active: `rgba(${mainColor}, 0.54)`,
            hover: `rgba(${mainColor}, 0.04)`,
            selected: `rgba(${mainColor}, 0.06)`,
            selectedOpacity: 0.06,
            disabled: `rgba(${mainColor}, 0.26)`,
            disabledBackground: `rgba(${mainColor}, 0.12)`,
            focus: `rgba(${mainColor}, 0.12)`
        }
    }
}

export default palette;

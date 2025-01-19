import useBackgroundColor from "hooks/useBackgroundColor";
import MuiChip from '@mui/material/Chip'

export default function CustomChip(props) {
    let { sx, color, rounded } = props;

    const bgColors = useBackgroundColor()

    const colors = {
        primary: { ...bgColors.primaryLight },
        secondary: { ...bgColors.secondaryLight },
        success: { ...bgColors.successLight },
        error: { ...bgColors.errorLight },
        warning: { ...bgColors.warningLight },
        info: { ...bgColors.infoLight }
    }
    const propsToPass = { ...props }
    propsToPass.rounded = undefined

    return (
        <MuiChip
            {...propsToPass}
            variant='filled'
            className={`${rounded && 'MuiChip-rounded'}`}
            sx={{
                ...(color && {...colors[color]}),
                ...sx
            }}
        />
    )
}

import {Avatar, Card, CardContent, Stack, Typography, useTheme} from "@mui/material";
import {AvatarGroup} from "@mui/lab";
import CustomChip from "components/chip/CustomChip";
import {CardShadow} from "theme/shadows";

export default function TaskCard(props) {
    const { task, ...rest } = props;
    const theme = useTheme();

    return (
        <Card sx={{
            cursor: 'pointer',
            boxShadow: CardShadow,
            border: `1px solid ${theme.palette.grey.A200}`
        }}>
            <CardContent>
                <Typography>{task.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap
                       sx={{
                           marginTop: 2,
                           whiteSpace: 'unset',
                           wordBreak: 'break-all'
                       }}>
                    <AvatarGroup
                        max={3}
                        sx={{
                            '& .MuiAvatar-root': {
                                width: 20,
                                height: 20,
                                fontSize: 11,
                                backgroundColor: 'secondary.main',
                                color: 'secondary.contrastText'
                            }
                        }}>
                        {task.assignees?.map((e, i) => (
                            <Avatar key={i} alt={e.name}>{e.name[0]}</Avatar>
                        ))}
                    </AvatarGroup>
                    {task.labels?.map((e, i) => (
                        <CustomChip
                            key={i}
                            color={e.color !== '' ? e.color : theme.palette.primary.main}
                            label={e.label}
                            size="small"
                            sx={{
                                height: 18,
                                '.MuiChip-label': {
                                    fontSize: 10,
                                    fontWeight: 500
                                }
                            }}/>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

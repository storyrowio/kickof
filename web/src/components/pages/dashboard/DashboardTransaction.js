'use client'

import {
    Box,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CustomChip from "components/chip/CustomChip";
import Image from "next/image";

const data = [
    {
        trend: '+$1,678',
        status: 'verified',
        cardType: 'Credit',
        cardNumber: '*4230',
        imgName: 'visa-with-bg',
        date: `17 Mar ${new Date().getFullYear()}`
    },
    {
        trend: '-$839',
        status: 'rejected',
        cardType: 'Credit',
        cardNumber: '*5578',
        imgName: 'mastercard-with-bg',
        date: `12 Feb ${new Date().getFullYear()}`
    },
    {
        trend: '+$435',
        cardType: 'ATM',
        status: 'verified',
        cardNumber: '*4567',
        imgName: 'american-express-with-bg',
        date: `28 Feb ${new Date().getFullYear()}`
    },
    {
        trend: '+$2,345',
        status: 'pending',
        cardType: 'Credit',
        cardNumber: '*5699',
        imgName: 'visa-with-bg',
        date: `08 Jan ${new Date().getFullYear()}`
    },
    {
        trend: '+$1,758',
        status: 'rejected',
        cardType: 'Credit',
        cardNumber: '*2451',
        imgName: 'visa-with-bg',
        date: `19 Oct ${new Date().getFullYear()}`
    }
]

const statusObj = {
    rejected: { text: 'Rejected', color: 'error' },
    pending: { text: 'Pending', color: 'secondary' },
    'on-hold': { text: 'On hold', color: 'warning' },
    verified: { text: 'Verified', color: 'success' }
}
export default function DashboardTransaction() {
    return (
        <Card>
            <CardHeader
                title='Last Transaction'
                // action={
                //     <OptionMenu
                //         options={['Show all entries', 'Refresh', 'Download']}
                //         iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                //     />
                // }
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{ '& .MuiTableCell-root': { py: 2, borderTop: theme => `1px solid ${theme.palette.divider}` } }}
                        >
                            <TableCell>Card</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Trend</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => {
                            return (
                                <TableRow
                                    key={row.cardNumber}
                                    sx={{
                                        '&:last-child .MuiTableCell-root': { pb: theme => `${theme.spacing(6)} !important` },
                                        '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(2.25)} !important` },
                                        '&:first-of-type .MuiTableCell-root': { pt: theme => `${theme.spacing(4.5)} !important` }
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', '& img': { mr: 4 } }}>
                                            <Image width={50} height={30} alt={row.imgName} src={`/images/logos/payment/${row.imgName}.png`} objectFit="cover"/>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                                    {row.cardNumber}
                                                </Typography>
                                                <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                                    {row.cardType}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                                Sent
                                            </Typography>
                                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                                {row.date}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <CustomChip
                                            rounded
                                            size='small'
                                            skin='light'
                                            label={statusObj[row.status].text}
                                            color={statusObj[row.status].color}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                            {row.trend}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

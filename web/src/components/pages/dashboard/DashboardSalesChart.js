'use client'

import {Card, CardContent, CardHeader, useTheme} from "@mui/material";
import ApexChart from "components/chart/ApexChart";

const series = [
    { name: 'Sales', data: [32, 27, 27, 30, 25, 25] },
    { name: 'Visits', data: [25, 35, 20, 20, 20, 20] }
];

export default function DashboardSalesChart() {
    const theme = useTheme()

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        colors: [theme.palette.primary.main, theme.palette.info.main],
        plotOptions: {
            radar: {
                size: 110,
                polygons: {
                    strokeColors: theme.palette.divider,
                    connectorColors: theme.palette.divider
                }
            }
        },
        stroke: { width: 0 },
        fill: {
            opacity: [1, 0.85]
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        markers: { size: 0 },
        legend: {
            fontSize: '13px',
            fontFamily: theme.typography.fontFamily,
            labels: { colors: theme.palette.text.secondary },
            itemMargin: {
                vertical: 4,
                horizontal: 10
            },
            markers: {
                width: 12,
                height: 12,
                radius: 10,
                offsetY: 1,
                offsetX: theme.direction === 'ltr' ? -4 : 5
            }
        },
        grid: {
            show: false,
            padding: {
                top: 10
            }
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    fontSize: theme.typography.body2.fontSize,
                    colors: [
                        theme.palette.text.disabled,
                        theme.palette.text.disabled,
                        theme.palette.text.disabled,
                        theme.palette.text.disabled,
                        theme.palette.text.disabled,
                        theme.palette.text.disabled
                    ]
                }
            }
        },
        yaxis: { show: false },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.lg,
                options: {
                    chart: { height: 337 }
                }
            }
        ]
    }

    return (
        <Card>
            <CardHeader
                title='Sales'
                subheader='Last 6 Months'
                // action={
                //     <OptionMenu
                //         options={['Last Month', 'Last 6 months', 'Last Year']}
                //         iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                //     />
                // }
            />
            <CardContent>
                <ApexChart type='radar' height={357} series={series} options={options} />
            </CardContent>
        </Card>
    )
}

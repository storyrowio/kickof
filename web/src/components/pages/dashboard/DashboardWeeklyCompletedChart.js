import dynamic from "next/dynamic";
import {useTheme} from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardWeeklyCompletedChart() {
    const theme = useTheme();
    const optionscolumnchart = {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0,
                stops: [20, 180],
            },
        },
        markers: {
            size: 0,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        xaxis: {
            categories: [['Sun'], ['Mon'], ['Tue'], ['Wed'], ['Thu'], ['Fri'], ['Sat']],
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
    };
    const seriescolumnchart = [
        {
            name: 'Weekly Stats',
            color: theme.palette.primary.main,
            data: [5, 15, 5, 10, 5, 6, 8],
        },
    ];

    return (
        <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height={330}
            width={"100%"}
        />
    );
}

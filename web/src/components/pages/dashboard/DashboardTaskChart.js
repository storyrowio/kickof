import {useTheme} from "@mui/material";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardTaskChart() {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.success.main;
    const secondarylight = theme.palette.success.light;

    const optionscolumnchart = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
            height: 320,
            offsetX: -20,
            stacked: true,
        },
        colors: ['#02c39a', '#58A3D4'],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: "60%",
                columnWidth: "30%",
                borderRadius: [6],
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "all",
            },
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
        },
        grid: {
            show: false,
        },
        yaxis: {
            min: -5,
            max: 5,
            tickAmount: 4,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May"],
            axisTicks: {
                show: false,
            },
        },
        // tooltip: {
        //     theme: theme.palette.mode === "dark" ? "dark" : "light",
        //     fillSeriesColor: true,
        // },
    };
    const seriescolumnchart = [
        {
            name: "Footware",
            data: [2.5, 3.7, 3.2, 2.6, 1.9],
        },
        {
            name: "Fashionware",
            data: [-2.8, -1.1, -3.0, -1.5, -1.9],
        },
    ];

    const options = {
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        colors: [theme.palette.primary.main, theme.palette.secondary.main],
        plotOptions: {
            bar: {
                columnWidth: "30%",
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: "all",
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        }
    }

    return (
        <Chart
            options={options}
            series={seriescolumnchart}
            type="bar"
            height="320px"
            width={"100%"}
        />
    );
}

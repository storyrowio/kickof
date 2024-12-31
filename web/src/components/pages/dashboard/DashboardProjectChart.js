import ApexChart from "components/chart/ApexChart";
import {useState} from "react";
import {useTheme} from "@mui/material";

export default function DashboardProjectChart() {
    const theme = useTheme();

    const [state, setState] = useState({
        series: [44, 55, 41],
        options: {
            chart: {
                type: 'donut',
            },
            colors: ['#02c39a', '#58A3D4', '#FFAB5A'],
            labels: ['Project 2', 'Storyrow', 'Development'],
            plotOptions: {
                pie: {
                    donut: {
                        size: '80%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                offsetY: 7,
                            },
                            value: {
                                show: false,
                            },
                            total: {
                                show: true,
                                color: theme.palette.text.primary,
                                fontSize: '20px',
                                fontWeight: '600',
                                label: '$500,458',
                            },
                        },
                    },
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    });

    return (
        <ApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height={330}
            width={"100%"}/>
    );
}

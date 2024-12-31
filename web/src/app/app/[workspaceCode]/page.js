'use client'

import {
    Card,
    CardContent,
    CardHeader,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useState} from "react";
import DashboardWidget from "components/pages/dashboard/DashboardWidget";
import DashboardProjectChart from "components/pages/dashboard/DashboardProjectChart";
import DashboardTaskChart from "components/pages/dashboard/DashboardTaskChart";
import DashboardWeeklyCompletedChart from "components/pages/dashboard/DashboardWeeklyCompletedChart";

export default function WorkspaceDashboard() {
    const [widgets, setWidgets] = useState([
        { title: 'Tasks', content: '1230', color: 'primary', icon: '/images/icons/dashboard-widget-1.svg' },
        { title: 'Completed Tasks', content: '1230', color: 'secondary', icon: '/images/icons/dashboard-widget-2.svg' },
        { title: 'Ongoing Tasks', content: '1230', color: 'info', icon: '/images/icons/dashboard-widget-3.svg' },
        { title: 'Overdue Tasks', content: '1230', color: 'success', icon: '/images/icons/dashboard-widget-4.svg' },
    ]);

    const tasks = [
        {
            "id": "c5c0693f-e267-4b8b-bf38-307fec68e97f",
            "workspaceId": "41e2672e-d40f-4ed7-ba15-727ebbf169b9",
            "projectId": "b94b2f1e-bb42-48e8-976b-93a9828b1add",
            "stateId": "8cbd57b6-1a46-4323-b43b-cf861a41db5a",
            "title": "Re-setup Kademiku",
        }
    ];

    return (
        <>
            <Grid2 container spacing={6}>
                {widgets.map((e, i) => (
                    <Grid2 key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <DashboardWidget
                            title={e.title}
                            content={e.content}
                            icon={e.icon}
                            color={e.color}/>
                    </Grid2>
                ))}
                <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                    <Card>
                        <CardHeader title="Tasks By Project"/>
                        <CardContent>
                            <DashboardProjectChart/>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                    <Card>
                        <CardHeader title="Completed vs On Progress Tasks"/>
                        <CardContent>
                            <DashboardTaskChart/>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                    <Card>
                        <CardHeader title="Completed vs On Progress Tasks"/>
                        <CardContent>
                            <DashboardWeeklyCompletedChart/>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                    <Card>
                        <CardHeader title="Recent Tasks"/>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableCell>Task</TableCell>
                                    <TableCell>Due Date</TableCell>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>{e.endDate ?? '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                    <Card>
                        <CardHeader title="Task Assigned To You"/>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableCell>Task</TableCell>
                                    <TableCell>Due Date</TableCell>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>{e.endDate ?? '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </>
    )
}

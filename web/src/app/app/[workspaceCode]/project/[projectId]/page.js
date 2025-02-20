'use client'

import {
    Card,
    CardContent,
    CardHeader,
    Grid2,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import DashboardWidget from "components/pages/dashboard/DashboardWidget";
import useSWR from "swr";
import PageService from "services/PageService";
import {DefaultSort} from "constants/constants";
import {useDispatch, useSelector} from "store";
import TaskService from "services/TaskService";
import {ArrowOutwardRounded} from "@mui/icons-material";
import {ThemeActions} from "store/slices/ThemeSlice";
import TaskForm from "components/pages/task/TaskForm";

export default function DashboardProject() {
    const dispatch = useDispatch();
    const { project } = useSelector(state => state.app);
    const { id } = useSelector(state => state.profile);

    const [widgets, setWidgets] = useState([
        { title: 'Tasks', content: '0', color: 'primary', icon: '/images/icons/dashboard-widget-1.svg' },
        { title: 'Completed Tasks', content: '0', color: 'secondary', icon: '/images/icons/dashboard-widget-2.svg' },
        { title: 'Ongoing Tasks', content: '0', color: 'info', icon: '/images/icons/dashboard-widget-3.svg' },
        { title: 'Overdue Tasks', content: '0', color: 'success', icon: '/images/icons/dashboard-widget-4.svg' },
    ]);

    const { data: resTask, isLoading: loading, mutate } = useSWR(
        project?.id ? '/api/task' : null,
        () => TaskService.getTasksByQuery({project: project?.id, limit: 10, sort: DefaultSort.newest.value, completed: false})
    );

    const { data: resTaskByAssign} = useSWR(
        project?.id ? '/api/task/assigned' : null,
        () => TaskService.getTasksByQuery({project: project?.id, user: id, limit: 10, sort: DefaultSort.newest.value, completed: false})
    );

    const { data: resTaskAll} = useSWR(
        project?.id ? '/api/task/all' : null,
        () => TaskService.getTasksByQuery({project: project?.id, limit: 1}));

    const { data: resTaskCompleted} = useSWR(
        project?.id ? '/api/task/completed' : null,
        () => TaskService.getTasksByQuery({project: project?.id, completed: true}));

    const { data: resTaskOngoing} = useSWR(
        project?.id ? '/api/task/inprogress' : null,
        () => TaskService.getTasksByQuery({project: project?.id, inProgress: true}));

    const { data: resTaskOverdue} = useSWR(
        project?.id ? '/api/task/overdue' : null,
        () => TaskService.getTasksByQuery({project: project?.id, overdue: true}));

    useEffect(() => {
        if (resTaskAll?.data?.pagination?.count > 0) { widgets[0] = {...widgets[0], content: resTaskAll?.data?.pagination?.count} }
        if (resTaskCompleted?.data?.pagination?.count > 0) { widgets[1] = {...widgets[1], content: resTaskCompleted?.data?.pagination?.count} }
        if (resTaskOngoing?.data?.pagination?.count > 0) { widgets[2] = {...widgets[2], content: resTaskOngoing?.data?.pagination?.count} }
        if (resTaskOverdue?.data?.pagination?.count > 0) { widgets[3] = {...widgets[3], content: resTaskOverdue?.data?.pagination?.count} }
    }, [resTaskAll, resTaskOngoing, resTaskCompleted, resTaskOverdue]);

    const handleEditTask = (data) => {
        dispatch(ThemeActions.setRightSidebarOpen(true));
        dispatch(ThemeActions.setRightSidebarContent(
            <TaskForm
                data={data}
                mutate={mutate}
                onClose={() => {
                    dispatch(ThemeActions.setRightSidebarOpen(false));
                    dispatch(ThemeActions.setRightSidebarContent(null))
                }}/>
        ));
    };

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
                <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                    <Card>
                        <CardHeader title="Recent Tasks"/>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableCell>Task</TableCell>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell/>
                                </TableHead>
                                <TableBody>
                                    {resTask?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>{e.endDate ?? '-'}</TableCell>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleEditTask(e)}>
                                                    <ArrowOutwardRounded fontSize="small"/>
                                                </IconButton>
                                            </TableCell>
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
                                    <TableCell/>
                                </TableHead>
                                <TableBody>
                                    {resTaskByAssign?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>{e.endDate ?? '-'}</TableCell>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleEditTask(e)}>
                                                    <ArrowOutwardRounded fontSize="small"/>
                                                </IconButton>
                                            </TableCell>
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

'use client'

import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import TaskKanban from "components/pages/task/TaskKanban";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import TaskForm from "components/pages/task/TaskForm";
import StateForm from "components/pages/project/state/StateForm";
import StateService from "services/StateService";
import useSWR from "swr";
import {DefaultSort} from "constants/constants";
import {useEffect, useState} from "react";
import TaskService from "services/TaskService";



export default function Task() {
    const dispatch = useDispatch();
    const { project } = useSelector(state => state.app);
    const [states, setStates] = useState([]);

    const { data: resState, mutate } = useSWR(
        project?.id ? '/api/state' : null,
        () => StateService.getStatesByQuery({
            project: project?.id,
            sort: DefaultSort.oldest.value
        })
    );

    useEffect(() => {
        if (states.length === 0) {
            setStates(resState?.data ?? []);
        }
    }, [resState?.data]);

    const handleTask = () => {
        dispatch(ThemeActions.setRightSidebarOpen(true));
        dispatch(ThemeActions.setRightSidebarContent(<TaskForm
            states={states}
            onClose={() => {
                dispatch(ThemeActions.setRightSidebarOpen(false));
                dispatch(ThemeActions.setRightSidebarContent(null))
            }}
            mutate={mutate}/>))
    };

    const handleState = () => {
        dispatch(ThemeActions.setRightSidebarOpen(true));
        dispatch(ThemeActions.setRightSidebarContent(<StateForm mutate={mutate}/>));
    };

    const handleUpdateTask = (task) => {
        return TaskService.updateTask(task.id, task);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4">All Tasks</Typography>
                        <Stack direction="row" spacing={3}>
                            <Button
                                size="small"
                                startIcon={<AddRounded/>}
                                variant="contained"
                                onClick={handleTask}>
                                Add Task
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                startIcon={<AddRounded/>}
                                variant="contained"
                                onClick={handleState}>
                                Add State
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <TaskKanban
                mutate={mutate}
                onUpdate={handleUpdateTask}/>
        </>
    )
}

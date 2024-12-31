import {Box, Button, Card, CardContent, Divider, Stack, styled, Typography} from "@mui/material";
import {StateType} from "constants/constants";
import {AddRounded} from "@mui/icons-material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskCard from "components/pages/task/components/TaskCard";
import {useDispatch} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import StateForm from "components/pages/project/state/StateForm";
import TaskForm from "components/pages/task/TaskForm";

const KanbanWrapper = styled(Box)(({ theme }) => ({
    minHeight: '70vh',
    paddingBottom: '0.95rem',
    overflowX: 'scroll',
    display: 'flex',
    gap: 20,
}));

export default function TaskKanban({ states }) {
    const dispatch = useDispatch();
    // const states = [
    //     {
    //         "id": "8cbd57b6-1a46-4323-b43b-cf861a41db5a",
    //         "workspaceId": "41e2672e-d40f-4ed7-ba15-727ebbf169b9",
    //         "projectId": "b94b2f1e-bb42-48e8-976b-93a9828b1add",
    //         "name": "Todo",
    //         "type": StateType.todo.value,
    //         "tasks": [
    //             {
    //                 "id": "c5c0693f-e267-4b8b-bf38-307fec68e97f",
    //                 "workspaceId": "41e2672e-d40f-4ed7-ba15-727ebbf169b9",
    //                 "projectId": "b94b2f1e-bb42-48e8-976b-93a9828b1add",
    //                 "stateId": "8cbd57b6-1a46-4323-b43b-cf861a41db5a",
    //                 "title": "Re-setup Kademiku",
    //                 "labels": [
    //                     {
    //                         "label": "Backend",
    //                         "color": "secondary",
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": "1cd8ae4d-01a6-456c-b621-28e2a5ed69d2",
    //         "workspaceId": "41e2672e-d40f-4ed7-ba15-727ebbf169b9",
    //         "projectId": "b94b2f1e-bb42-48e8-976b-93a9828b1add",
    //         "name": "On Progress",
    //         "type": StateType.inProgress.value
    //     }
    // ];

    const handleEditTask = (data) => {
        dispatch(ThemeActions.setRightSidebarOpen(true));
        dispatch(ThemeActions.setRightSidebarContent(
            <TaskForm
                data={data}
                states={states}
                onClose={() => {
                dispatch(ThemeActions.setRightSidebarOpen(false));
                dispatch(ThemeActions.setRightSidebarContent(null))
            }}/>
        ));
    };

    const onDragEnd = (result) => {
        console.log(result)
    };

    return (
        <>

            <Box height={30}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <KanbanWrapper>
                    {states?.map((state, i) => (
                        <Box key={i} sx={{ minWidth: 300 }}>
                            <Typography variant="h6" gutterBottom>
                                {state.name}
                            </Typography>
                            <Divider sx={{ my: 4 }}/>
                            <Box sx={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
                                <Droppable droppableId={state.id}>
                                    {(provided) => (
                                        <Stack
                                            spacing={3}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            sx={{ minHeight: 100 }}>
                                            {state.tasks?.map((task, j) => (
                                                <Draggable key={task.id} draggableId={task.id} index={j}>
                                                    {(provided) => (
                                                        <Box
                                                            onClick={() => handleEditTask(task)}
                                                            sx={{ maxWidth: '100%' }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <TaskCard
                                                                task={task}
                                                                // onClick={() => setTaskForm({open: true, data: task})}
                                                            />
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </Stack>
                                    )}
                                </Droppable>
                            </Box>
                        </Box>
                    ))}
                </KanbanWrapper>
            </DragDropContext>
        </>
    );
}

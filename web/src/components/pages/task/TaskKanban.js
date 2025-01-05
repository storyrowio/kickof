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

export default function TaskKanban({ states, mutate, onUpdate }) {
    const dispatch = useDispatch();

    const handleEditTask = (data) => {
        dispatch(ThemeActions.setRightSidebarOpen(true));
        dispatch(ThemeActions.setRightSidebarContent(
            <TaskForm
                data={data}
                states={states}
                mutate={mutate}
                onClose={() => {
                dispatch(ThemeActions.setRightSidebarOpen(false));
                dispatch(ThemeActions.setRightSidebarContent(null))
            }}/>
        ));
    };

    const onDragEnd = (task) => {
        const destinationState = states.find(e => e.id === task?.destination?.droppableId);
        const sourceState = states.find(e => e.id === task?.source?.droppableId);

        // Update moved task
        const movedTask = sourceState?.tasks?.find(e => e.id === task?.draggableId);
        movedTask.stateId = task?.destination?.droppableId;

        if (task?.destination?.droppableId !== task?.source?.droppableId) {
            // Update destination task list
            destinationState.tasks?.splice(task?.destination.index, 0, movedTask);

            // Remove task from source
            sourceState.tasks = sourceState.tasks?.filter(e => e.id !== task?.draggableId);
        } else {
            sourceState.tasks.splice(task?.destination.index, 0, sourceState.splice(task?.source.index, 1)[0])
        }

        onUpdate(movedTask);
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
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}>
                                            <Stack spacing={3} sx={{ minHeight: 100 }}>
                                                {state.tasks?.map((task, j) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={j}>
                                                        {(provided) => (
                                                            <Box
                                                                onClick={() => handleEditTask(task)}
                                                                sx={{ maxWidth: '100%' }}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <TaskCard task={task}/>
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </Stack>
                                            {provided.placeholder}
                                        </div>
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

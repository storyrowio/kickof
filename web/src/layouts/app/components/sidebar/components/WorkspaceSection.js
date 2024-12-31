import {useDispatch, useSelector} from "store";
import {Box, FormLabel, MenuItem, Select, Stack} from "@mui/material";
import {AppActions} from "store/slices/AppSlice";
import {useRouter} from "next/navigation";

export default function WorkspaceSection() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { workspaces, workspace, project, projects } = useSelector(state => state.app);
    const { sidebarWidth } = useSelector(state => state.theme);

    const handleSelect = (id) => {
        const workspaceItem = workspaces.find(item => item.id === id);
        dispatch(AppActions.setWorkspace(workspaceItem));
        router.push(`/app/${workspaceItem?.code}`)
    };

    const handleSelectProject = (id) => {
        const item = projects.find(item => item.id === id);
        dispatch(AppActions.setProject(item));
        router.push(`/app/${workspace?.code}/project/${item?.id}`)
    }

    return (
        <Box sx={{ maxWidth: sidebarWidth, paddingY: 3, paddingX: 5 }}>
            <Stack spacing={2}>
                {workspaces?.length > 0 && (
                    <Box>
                        <FormLabel>Current Workspace</FormLabel>
                        <Select
                            fullWidth
                            size="small"
                            sx={{
                                height: 30,
                                '.MuiSelect-select': {
                                    fontSize: 13
                                }
                            }}
                            onChange={(e) => handleSelect(e.target.value)}
                            value={workspace?.id ?? null}>
                            {workspaces?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}
                {project?.id && (
                    <Box>
                        <FormLabel>Current Project</FormLabel>
                        <Select
                            fullWidth
                            size="small"
                            sx={{
                                height: 30,
                                '.MuiSelect-select': {
                                    fontSize: 13
                                }
                            }}
                            onChange={(e) => handleSelectProject(e.target.value)}
                            value={project?.id ?? null}>
                            {projects?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}
            </Stack>
        </Box>
    )
}

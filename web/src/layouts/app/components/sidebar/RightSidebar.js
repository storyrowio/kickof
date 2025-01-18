import {ThemeActions} from "store/slices/ThemeSlice";
import {CardShadow} from "theme/shadows";
import {Drawer} from "@mui/material";
import {useDispatch, useSelector} from "store";

export default function RightSidebar() {
    const dispatch = useDispatch();
    const { rightSideBarOpen, rightSideBarContent } = useSelector(state => state.theme);

    return (
        <Drawer
            open={rightSideBarOpen}
            onClose={() => {
                dispatch(ThemeActions.setRightSidebarOpen(false));
                dispatch(ThemeActions.setRightSidebarContent(null));
            }}
            anchor="right"
            variant="temporary"
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: {lg: '40%'},
                    border: 'none',
                    boxShadow: CardShadow,
                    boxSizing: 'border-box',
                },
            }}>
            {rightSideBarContent}
        </Drawer>
    );
}

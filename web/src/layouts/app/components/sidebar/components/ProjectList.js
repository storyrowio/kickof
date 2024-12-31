import {useSelector} from "store";
import {List, ListItem, Typography} from "@mui/material";
import MenuNavLink from "layouts/app/components/sidebar/styles/MenuNavLink";
import MenuItemTextMetaWrapper from "layouts/app/components/sidebar/styles/MenuItemTextMetaWrapper";
import {useParams, useRouter} from "next/navigation";

export default function ProjectList() {
    const router = useRouter();
    const params = useParams();
    const { projects } = useSelector(state => state.app);

    return (
        <List sx={{ pt: 0 }}>
            {projects?.map((e, i) => (
                <ListItem key={i} sx={{
                    py: 0.5,
                    px: 5,
                }}>
                    <MenuNavLink
                        onClick={() => router.push(`/app/${params?.workspaceCode}/project/${e.id}`)}>
                        <MenuItemTextMetaWrapper>
                            <Typography>{e.name}</Typography>
                        </MenuItemTextMetaWrapper>
                    </MenuNavLink>
                </ListItem>
            ))}
        </List>
    )
}

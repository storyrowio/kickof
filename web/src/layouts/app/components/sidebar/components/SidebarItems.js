import SidebarGroup from "layouts/app/components/sidebar/components/SidebarGroup";
import SidebarItem from "layouts/app/components/sidebar/components/SidebarItem";
import SidebarSectionTitle from "layouts/app/components/sidebar/components/SidebarSectionTitle";
import CanAccess from "components/rbac/CanAccess";

export default function SidebarItems(props) {
    const { items, parent, themeConfig } = props;

    const renderItem = (item, key) => {
        if (item.children) {
            return <SidebarGroup key={key} item={item} parent={parent} themeConfig={themeConfig}/>
        } else if (item.sectionTitle) {
            return <SidebarSectionTitle key={key} title={item.sectionTitle}/>
        } else {
            return <SidebarItem key={key} item={item} parent={parent} themeConfig={themeConfig}/>
        }
    };

    return items.map((e, i) => {
        if (!e.permissions && !e.roles) {
            return renderItem(e, i)
        } else {
            return (
                <CanAccess key={i} permissions={e.permissions ?? []} roles={e.roles}>
                    {renderItem(e)}
                </CanAccess>
            )
        }
    })
}

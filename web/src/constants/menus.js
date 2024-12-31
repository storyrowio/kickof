import {
    AccountTreeRounded, AutoStoriesRounded,
    DashboardRounded, DocumentScannerRounded,
    PeopleRounded, SettingsRounded,
    StorageRounded
} from "@mui/icons-material";
import {GenerateUniqueId} from "utils/helper";
import Roles from "constants/role";

const Menus = [
    {
        sectionTitle: 'Workspace',
        roles: [Roles.admin],
    },
    {
        id: GenerateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '',
    },
    {
        id: GenerateUniqueId(),
        title: 'Members',
        icon: PeopleRounded,
        permissions: ['user:read', 'user:create'],
    },
    {
        id: GenerateUniqueId(),
        title: 'Role & Permission',
        icon: AccountTreeRounded,
        href: '/role',
        roles: [Roles.admin]
    },
    {
        id: GenerateUniqueId(),
        title: 'Configuration',
        icon: StorageRounded,
        href: '/configuration',
        roles: [Roles.admin]
    },
    {
        sectionTitle: 'Projects',
        roles: [Roles.admin],
        permissions: ['setting:read'],
    },
];

export const ProjectMenus = [
    {
        sectionTitle: 'Workspace',
        roles: [Roles.admin],
    },
    {
        id: GenerateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '',
    },
    {
        sectionTitle: 'Project',
        permissions: ['project:read'],
    },
    {
        id: GenerateUniqueId(),
        title: 'Tasks',
        icon: DocumentScannerRounded,
        href: '/task',
        permissions: ['project:read', 'task:read'],
    },
    {
        id: GenerateUniqueId(),
        title: 'Pages',
        icon: AutoStoriesRounded,
        href: '/page',
        permissions: ['project:read', 'task:read'],
    },
    {
        id: GenerateUniqueId(),
        title: 'Setting',
        icon: SettingsRounded,
        href: '/setting',
        permissions: ['project:read', 'task:read'],
    },
];

export default Menus;

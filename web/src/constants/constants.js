export const BasicSort = {
    newest: { name: 'Newest', value: 'createdAt,-1' },
    oldest: { name: 'Oldest', value: 'createdAt,1' },
};

export const DefaultSort = {
    name: { name: 'Name', value: 'name,1' },
    ...BasicSort
};

export const LabelSort = {
    ...BasicSort,
    label: { name: 'Label', value: 'label,1' }
};

export const PageSort = {
    title: { name: 'Title', value: 'title,1' },
    ...BasicSort
};

export const SettingTypes = {
    general: { name: 'General', value: 'general' },
    storage: { name: 'Storage', value: 'storage' },
    payment: { name: 'Payment', value: 'payment' }
};

export const StateType = {
    todo: { name: 'Todo', value: 'todo' },
    inProgress: { name: 'In Progress', value: 'inProgress' },
    completed: { name: 'Completed', value: 'completed' },
    cancelled: { name: 'Cancelled', value: 'cancelled' },
}

export const WorkspaceSizes = ['1', '2-20', '21-200', '200+'];

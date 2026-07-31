export type ProjectEpicRequest = {
    title: string;
    description: string;
    assignee_id: string;
    project_id: string;
    deadline: string;
}


export type ProjectEpicResponse = {
    id: string;
    epic_id: string;
    title: string;
    description: string;
    created_at: string;
    created_by: {
        sub: string;
        name: string;
        email: string;
        department: string;
    },
    assignee: {
        sub: string;
        name: string;
        email: string;
        department: string;
    }
}

export type ProjectEpic = {
    epicId: string;
    title: string;
    assigneeName: string;
    assigneeAvatar: string;
    createdBy: string;
    createdAt: string;
}
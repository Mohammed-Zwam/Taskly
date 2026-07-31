export type ProjectRequest = {
    name: string;
    description: string;
}


export type Project = {
    id: string;
    created_at: string;
    created_by: string;
    name: string;
    description: string;
}


export type ProjectMembersResponse = {
    member_id: string;
    user_id: string;
    role: string;
    metadata: {
        department: string;
        email: string;
        name: string;
    }
}

export type ProjectMember = {
    memberId: string;
    role: string;
    userId: string;
    department: string;
    email: string;
    name: string;
    avatar: string;
    avatarColor: string;
}

export type PageState = 'loading' | 'success' | 'empty' | 'error';
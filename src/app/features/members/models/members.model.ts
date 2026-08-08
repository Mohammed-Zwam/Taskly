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
    department: string;
    email: string;
    name: string;
    avatar: string;
    avatarColor: string;
    userId: string;
}


export type MemberOption = {
    value: string;
    label: string;
    avatar: string;
}
export type PageState = 'loading' | 'success' | 'empty' | 'error';

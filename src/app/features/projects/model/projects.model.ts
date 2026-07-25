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

export type ProjectsState = 'loading' | 'success' | 'empty' | 'error';
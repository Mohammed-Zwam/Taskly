export const API = {
    BASE: 'https://gkeedgzikmsakiuabcwq.supabase.co',
    PUBLISHER_KEY: 'sb_publishable_Y-SLucrepZfjENKY73FLzQ_-mKGnP6E',
    SIGNUP: '/auth/v1/signup',
    LOGIN: '/auth/v1/token?grant_type=password',
    ONE_MONTH: 2592000,
    REFRESH_TOKEN: '/auth/v1/token?grant_type=refresh_token',
    LOGOUT: '/auth/v1/logout',
    FORGET_PASSWORD: '/auth/v1/recover',
    RESET_PASSWORD: '/auth/v1/user',
    CREATE_PROJECT: '/rest/v1/projects',
    UPDATE_PROJECT: '/rest/v1/projects',
    GET_PROJECTS: '/rest/v1/rpc/get_projects',
    GET_PROJECT_MEMBERS: '/rest/v1/get_project_members',
    CREATE_PROJECT_EPIC: '/rest/v1/epics',
    GET_PROJECT_EPICS: '/rest/v1/project_epics'
    CREATE_PROJECT_EPIC: '/rest/v1/epics'
};

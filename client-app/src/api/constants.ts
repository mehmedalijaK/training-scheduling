export const API_URL = "http://localhost:9090";
export const NOTIFICATIONS_URL = "http://localhost:9091";
export const API_SIGN_UP_USER = `${API_URL}/api/client/register`;
export const API_SIGN_IN_USER = `${API_URL}/api/client/login`;
export const API_SIGN_UP_MANAGER = `${API_URL}/api/manager/register`;
export const API_SING_IN_MANAGER = `${API_URL}/api/manager/login`;
export const API_SING_IN_ADMIN = `${API_URL}/api/admin/login`;
export const API_EDIT_USER = `${API_URL}/api/client/edit`;
export const API_GET_ALL_USERS = `${API_URL}/api/client/all`;
export const API_EDIT_ADMIN = `${API_URL}/api/admin/edit`;
export const API_CHANGE_PASSWORD_USER = `${API_URL}/api/client/change-password`;
export const API_EDIT_MANAGER = `${API_URL}/api/manager/edit`;
export const API_CHANGE_PASSWORD_MANAGER = `${API_URL}/api/manager/change-password`;

export const API_GET_MYSELF_USER = `${API_URL}/api/client/me`;
export const API_GET_MYSELF_MANAGER = `${API_URL}/api/manager/me`;
export const API_GET_MYSELF_ADMIN = `${API_URL}/api/admin/me`;

export const NOTIFICATIONS_GET_ME = `${NOTIFICATIONS_URL}/notification/me`;
export const NOTIFICATIONS_GET_ME_FILTERED = `${NOTIFICATIONS_URL}/notification/me/filter`;
export const NOTIFICATIONS_GET_ALL_FILTERED = `${NOTIFICATIONS_URL}/notification/all`;

export const API_BAN_USER = `${API_URL}/api/admin/ban/user`;
export const API_UNBAN_USER = `${API_URL}/api/admin/unban/user`;
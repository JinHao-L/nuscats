// Auth
export const LANDING_ROUTE = '/';
export const SIGNUP_ROUTE = '/signup';
export const SIGNIN_ROUTE = '/signin';
export const SETUP_PROFILE_ROUTE = '/setup-profile';

export const FORGET_PASSWORD_ROUTE = '/forget-password';
export const RESEND_EMAIL_ROUTE = '/resend';

// External routing from email service
export const PASSWORD_RESET_ROUTE = '/password-reset';
export const EMAIL_CONFIRM_ROUTE = '/confirm-email';

// TabsRoute
export const ROOT_ROUTE = '/app';
export const MAP_ROUTE = `${ROOT_ROUTE}/home`;
export const FEED_ROUTE = `${ROOT_ROUTE}/home/feeds`;
export const CAT_ROUTE = `${ROOT_ROUTE}/cats`;

export const PROFILE_ROUTE = `${ROOT_ROUTE}/profile`;
export const PROFILE_SETTINGS_ROUTE = `${PROFILE_ROUTE}/settings`;
export const CHANGE_USERNAME_ROUTE = `${PROFILE_ROUTE}/changeusername`;
export const CHANGE_PASSWORD_ROUTE = `${PROFILE_ROUTE}/changepassword`;
export const CHANGE_NAME_DP_ROUTE = `${PROFILE_ROUTE}/change-name-and-dp`;

export const ADMIN_ROUTE = `${ROOT_ROUTE}/admin`;
export const BROADCAST_ANNOUNCEMENT_ROUTE = `${ADMIN_ROUTE}/announcement`;
export const REQUEST_LOCATION_ROUTE = `${ADMIN_ROUTE}/reqlocation`;
export const EDIT_CATS_ROUTE = `${ADMIN_ROUTE}/edit`;
export const ALERT_CATS_ROUTE = `${ADMIN_ROUTE}/alert`;

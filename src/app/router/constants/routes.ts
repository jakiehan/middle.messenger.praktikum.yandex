export const ROUTES = {
  MAIN: '/',
  LOGIN: '/sign-in',
  REGISTRATION: '/sign-up',
  CHAT: '/chat',
  PROFILE: '/profile',
  NOT_FOUND: '/404',
  ERROR: '/500',
} as const;

export const getRouteMain = () => ROUTES.MAIN;
export const getRouteLogin = () => ROUTES.LOGIN;
export const getRouteRegistration = () => ROUTES.REGISTRATION;
export const getRouteChat = (id: string) => ROUTES.CHAT + `/${id}`;
export const getRouteProfile = (id: string) => ROUTES.PROFILE + `/${id}`;
export const getRouteNotFound = () => ROUTES.NOT_FOUND;
export const getRouteError = () => ROUTES.ERROR;

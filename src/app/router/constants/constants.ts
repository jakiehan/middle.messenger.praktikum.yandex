import { Authorization } from '@/pages/Authorization';
import { Registration } from '@/pages/Registration';
import { NotFound } from '@/pages/NotFound';
import { Error } from '@/pages/Error';
import { UserProfile } from '@/pages/UserProfile';
import { Main } from '@/pages/Main';
import {
  ROUTES,
  getRouteError,
  getRouteMain,
  getRouteLogin,
  getRouteRegistration,
  getRouteProfile,
  getRouteNotFound,
  getRouteChat,
} from '@/app/router/constants/routes.ts';

const AuthorizationPage = new Authorization();
const RegistrationPage = new Registration();
const NotFoundPage = new NotFound();
const ErrorPage = new Error();
const MainPage = new Main();
const UserProfilePage = new UserProfile();

AuthorizationPage.registerPartial();
RegistrationPage.registerPartial();
NotFoundPage.registerPartial();
ErrorPage.registerPartial();
MainPage.registerPartial();
UserProfilePage.registerPartial();

export interface Page {
  render: () => string;
  destroy?: () => void;
  mount?: () => void;
}

export type Route = {
  path: string;
  element: Page;
  public?: boolean;
};

type RouteKeys = keyof typeof ROUTES;
type RouteConfig = Record<RouteKeys, Route>;

export const routeConfig: RouteConfig = {
  MAIN: {
    path: getRouteMain(),
    element: MainPage,
    public: true,
  },
  LOGIN: {
    path: getRouteLogin(),
    element: AuthorizationPage,
    public: true,
  },
  ERROR: {
    path: getRouteError(),
    element: ErrorPage,
    public: true,
  },
  REGISTRATION: {
    path: getRouteRegistration(),
    element: RegistrationPage,
    public: true,
  },
  PROFILE: {
    path: getRouteProfile(':id'),
    element: UserProfilePage,
    public: true,
  },
  NOT_FOUND: {
    path: getRouteNotFound(),
    element: NotFoundPage,
    public: true,
  },
  CHAT: {
    path: getRouteChat(':id'),
    element: MainPage,
    public: true,
  },
};

import { Authorization } from '@/pages/Authorization';
import { Registration } from '@/pages/Registration';
import { NotFound } from '@/pages/NotFound';
import { Error } from '@/pages/Error';
import { Chat } from '@/pages/Chat';
import { Main } from '@/pages/Main';
import { UserProfile } from '@/pages/UserProfile';
import { ChatLayout } from '@/shared/ui/Layout';
import type { Component } from '@/shared/lib';
import {
  ROUTES,
  getRouteError,
  getRouteMain,
  getRouteLogin,
  getRouteRegistration,
  getRouteProfile,
  getRouteNotFound,
  getRouteChat,
} from '@/app/router/constants/routes';

export type ComponentClass<T extends Component = Component<any>> = new (
  ...args: any[]
) => T;

export type Route = {
  path: string;
  element: ComponentClass;
  public?: boolean;
  layout?: ComponentClass;
};

type RouteKeys = keyof typeof ROUTES;
type RouteConfig = Record<RouteKeys, Route>;

export const routeConfig: RouteConfig = {
  MAIN: {
    path: getRouteMain(),
    element: Main,
    public: true,
    layout: ChatLayout as typeof Component,
  },
  LOGIN: {
    path: getRouteLogin(),
    element: Authorization,
    public: true,
  },
  ERROR: {
    path: getRouteError(),
    element: Error,
    public: true,
  },
  NOT_FOUND: {
    path: getRouteNotFound(),
    element: NotFound,
    public: true,
  },
  REGISTRATION: {
    path: getRouteRegistration(),
    element: Registration,
    public: true,
  },
  PROFILE: {
    path: getRouteProfile(':id'),
    element: UserProfile,
    public: true,
  },
  CHAT: {
    path: getRouteChat(':id'),
    element: Chat,
    public: true,
    layout: ChatLayout as typeof Component,
  },
};

import { type ComponentClass, routeConfig } from './constants/constants';
import { Component } from '@/shared/lib/Component/Component';
import { getParams, getRouteByPath } from './lib/parseRoute';

export class Router {
  private static instance: Router | null = null;
  private isInitialized = false;
  private currentPage?: Component;
  private config = {
    appSelector: '.app',
    linkSelector: 'a[href^="/"]',
  };

  private constructor() {}

  public static getInstance(): Router {
    return Router.instance ?? (Router.instance = new Router());
  }

  private handlePopState = () => {
    this.render(window.location.pathname);
  };

  private handleClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest(this.config.linkSelector);
    if (link instanceof HTMLAnchorElement) {
      e.preventDefault();
      this.navigate(new URL(link.href).pathname);
    }
  };

  private mountComponent(component: Component, appElement: Element) {
    const content = component.getContent();

    if (content) {
      appElement.innerHTML = '';
      appElement.append(content);
      component.dispatchComponentDidMount();
    }

    this.currentPage = component;
  }

  private renderWithLayout(
    Layout: ComponentClass,
    pageInstance: Component,
    appElement: Element
  ) {
    if (this.currentPage instanceof Layout) {
      this.currentPage.setSlot('content', pageInstance);
    } else {
      const layoutInstance = new Layout({ content: pageInstance });
      this.mountComponent(layoutInstance, appElement);
    }
  }

  private render(path: string) {
    const appElement = document.querySelector(this.config.appSelector);
    if (!appElement) return;

    const match = getRouteByPath(path);
    const route = match?.route ?? routeConfig.NOT_FOUND;
    const Page = route.element;
    const Layout = route?.layout;

    const params = match ? (getParams(path, route.path) ?? {}) : {};

    const pageInstance = new Page(params);

    if (Layout) {
      this.renderWithLayout(Layout, pageInstance, appElement);
    } else {
      this.mountComponent(pageInstance, appElement);
    }
  }

  public navigate(path: string, render = true) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    if (render) this.render(path);
  }

  public init() {
    if (this.isInitialized) {
      console.warn('Router уже инициализирован');
      return;
    }
    this.isInitialized = true;

    window.addEventListener('popstate', this.handlePopState);
    document.addEventListener('click', this.handleClick);

    this.render(window.location.pathname);
  }
}

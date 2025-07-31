import { routeConfig } from './constants/constants.ts';
import type { Page } from './constants/constants.ts';
import { getRouteByPath } from './lib/parseRoute.ts';

export class Router {
  private static instance: Router | null = null;
  private isInitialized = false;
  private currentPage: Page | undefined = undefined;
  private config = {
    appSelector: '.app',
    linkSelector: 'a[href^="/"]',
  };

  private constructor() {}

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  private handlePopState = () => {
    this.render(window.location.pathname);
  };

  private handleClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest(this.config.linkSelector);
    if (link && link instanceof HTMLAnchorElement) {
      e.preventDefault();
      const { pathname } = new URL(link.href);
      this.navigate(pathname);
    }
  };

  private render(path: string) {
    const appElement = document.querySelector(this.config.appSelector);

    if (!appElement) {
      console.error(
        `Элемент с селектором "${this.config.appSelector}" не найден`
      );
      return;
    }

    if (this.currentPage?.destroy) {
      this.currentPage.destroy();
    }

    const match = getRouteByPath(path);
    this.currentPage = match?.route?.element;
    appElement.innerHTML =
      this?.currentPage?.render() ?? routeConfig.NOT_FOUND.element.render();

    if (this.currentPage?.mount) {
      this.currentPage.mount();
    }
  }

  public navigate(path: string, render = true) {
    window.history.pushState({}, '', path);

    if (render) {
      this.render(path);
    }
  }

  public configure(options: Partial<typeof this.config>) {
    this.config = { ...this.config, ...options };
    return this;
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

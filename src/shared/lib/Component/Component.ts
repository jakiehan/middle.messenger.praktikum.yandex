import { EventBus } from '../EventBus/EventBus';
import Handlebars from 'handlebars';

export type ComponentProps = Partial<
  { [key: string]: unknown } & { className?: string }
>;

type Children = Record<string, Component>;
type Lists = Record<string, Array<Component | unknown>>;
type Events = Record<string, EventListener>;

export class Component<P extends ComponentProps = ComponentProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  private _id: string = crypto.randomUUID();
  private _events: Events = {};
  private _setUpdate = false;
  protected readonly _props: P;
  protected _children: Children = {};
  protected _lists: Lists = {};

  private eventBus: () => EventBus;

  constructor(propsAndChildren: P) {
    const { children, props, lists } = this._getChildren(
      propsAndChildren ?? {}
    );

    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(lists);
    this._props = this._makePropsProxy({ ...props }) as P;

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(
      Component.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as unknown as (
        ...args: unknown[]
      ) => void
    );
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  get id() {
    return this._id;
  }

  getContent(): HTMLElement | null {
    const content = this._element;

    if (this._props.className && content) {
      content.className = this._props.className;
    }

    return content;
  }

  get props(): P {
    return this._props;
  }

  get children() {
    return this._children;
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  protected componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(_oldProps: P, _newProps: P) {
    const shouldUpdate = this.componentDidUpdate(_oldProps, _newProps);
    if (shouldUpdate) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  setProps(next: Partial<P>) {
    if (!next) return;

    this._setUpdate = false;
    const oldProps = { ...this._props };

    const { children, props, lists } = this._getChildren(next);

    if (Object.keys(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.keys(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.keys(lists).length) {
      Object.assign(this._lists, lists);
    }

    if (this._setUpdate) {
      this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  }

  setSlot(slotName: string, component: Component<P>) {
    const root = this.getContent();
    if (!root) return;

    const slot = root.querySelector(`[data-slot="${slotName}"]`);
    if (!slot) return;

    const slotContent = component.getContent();

    if (slotContent) {
      slot.innerHTML = '';
      slot.append(slotContent);
      component.dispatchComponentDidMount();
    }

    this._children[slotName] = component;
  }

  protected render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement | null;

    if (!newElement) {
      throw new Error('Шаблон не содержит корневого элемента');
    }

    if (this._element && this._element.parentNode) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected compile(template: string, props?: ComponentProps) {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.keys(this._lists).forEach((key) => {
      propsAndStubs[key] = `<div data-id="l-${key}"></div>`;
    });

    const html = Handlebars.compile(template)(propsAndStubs);

    const tpl = document.createElement('template');
    tpl.innerHTML = html;

    Object.values(this._children).forEach((child) => {
      const stub = tpl.content.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        const childContent = child.getContent();
        if (childContent) {
          stub.replaceWith(childContent);
        }
      }
    });

    Object.entries(this._lists).forEach(([key, child]) => {
      const stub = tpl.content.querySelector(`[data-id="l-${key}"]`);
      if (!stub) return;

      const listContent = document.createElement('template');

      child.forEach((item) => {
        if (item instanceof Component) {
          const listItem = document.createElement('li');
          const itemContent = item.getContent();

          if (itemContent) {
            listItem.append(itemContent);
          }

          listContent.content.append(listItem);
        } else {
          listContent.content.append(`${item}`);
        }
      });

      stub.replaceWith(listContent.content);
    });

    return tpl.content;
  }

  private _getChildren(input: Partial<P>) {
    const children: Record<string, Component> = {};
    const props: ComponentProps = {};
    const lists: Lists = {};

    Object.entries(input).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  private _makePropsProxy<T extends object>(props: T): T {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop as keyof typeof target];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const propTypeof = prop as keyof typeof target;

        if (target[propTypeof] !== value) {
          target[propTypeof] = value;
          this._setUpdate = true;
        }

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет прав на удаление');
      },
    });
  }

  private _addEvents() {
    if (!this._element) return;

    const regex = /^on[A-Z]/;

    Object.keys(this._props).forEach((key) => {
      const value = this._props[key];

      if (regex.test(key) && typeof value === 'function') {
        const listener = value as (evt: Event) => void;

        const eventName = key.slice(2).toLowerCase();
        this._events[eventName] = listener;
        this._element?.addEventListener(eventName, listener);
      }
    });
  }

  private _removeEvents() {
    if (!this._element) return;

    Object.keys(this._events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, this._events[eventName]);
    });

    this._events = {};
  }
}

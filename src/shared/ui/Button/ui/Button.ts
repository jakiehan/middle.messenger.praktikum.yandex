import Handlebars from 'handlebars';
import templateButton from './Button.hbs?raw';
import cls from './Button.module.scss';
import { cn } from '../../../lib/cn/cn.ts';

interface ButtonProps {
  text: string;
  id: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export class Button {
  public props: ButtonProps;
  private readonly template: HandlebarsTemplateDelegate;
  private buttonElement: HTMLElement | null = null;

  constructor(props: ButtonProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateButton);
  }

  registerPartial() {
    Handlebars.registerPartial('Button', templateButton);
  }

  render() {
    const classes = cn(cls.button, [this.props.className]);

    return this.template({
      ...this.props,
      classes,
    });
  }

  mount() {
    if (this.props.id && this.props.onClick) {
      this.buttonElement = document.getElementById(this.props.id);

      if (this.buttonElement) {
        this.buttonElement.addEventListener('click', this.props.onClick);
      }
    }
  }

  destroy() {
    if (this.buttonElement && this.props.onClick) {
      this.buttonElement.removeEventListener('click', this.props.onClick);
    }

    this.buttonElement = null;
  }
}

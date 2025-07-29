import Handlebars from 'handlebars';
import templateFormAuth from './FormAuth.hbs?raw';
import { Link } from '../../Link';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './FormAuth.module.scss';

interface FormAuthProps {
  name: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
  title: string;
  onSubmit: () => void;
  children: Input[];
  className?: string;
}

export class FormAuth {
  private form: HTMLFormElement | null = null;
  private readonly handleSubmit: (e: Event) => void;
  public props: FormAuthProps;
  private readonly template: HandlebarsTemplateDelegate;
  private button: Button;
  private link: Link;
  private text: Text;

  constructor(props: FormAuthProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateFormAuth);

    this.handleSubmit = (e: Event) => {
      e.preventDefault();
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    };

    this.text = new Text({
      tag: 'h3',
      text: this.props.title,
      fontWeight: 'normal',
      size: 'sizeXL',
    });

    this.button = new Button({
      text: this.props.buttonText,
      type: 'submit',
      id: 'submitAuth',
    });

    this.link = new Link({
      text: this.props.linkText,
      href: this.props.linkHref,
    });
  }

  private addSubmitHandler() {
    this.form = document.querySelector(`form[name="${this.props.name}"]`);

    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit);
    }
  }

  destroy() {
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit);
      this.form = null;
    }
  }

  mount() {
    this.addSubmitHandler();
  }

  registerPartial() {
    Handlebars.registerPartial('FormAuth', templateFormAuth);

    this.button.registerPartial();
    this.link.registerPartial();
    this.text.registerPartial();
    this.props.children.forEach((input) => input.registerPartial());
  }

  render() {
    const classes = cn(cls.formAuth, [this.props.className]);

    return this.template({
      classes,
      controlsClass: cls.controls,
      name: this.props.name,
      title: this.text.render(),
      button: this.button.render(),
      link: this.link.render(),
      inputs: this.props.children.map((input) => input.render()),
    });
  }
}

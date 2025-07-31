import Handlebars from 'handlebars';
import templateFormSearch from './FormSearch.hbs?raw';
import { Input } from '../../Input';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './FormSearch.module.scss';

interface FormSearchProps {
  name: string;
  placeholder?: string;
  className?: string;
}

export class FormSearch {
  public props: FormSearchProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly input: Input;

  constructor(props: FormSearchProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateFormSearch);

    this.input = new Input({
      name: 'searchChat',
      placeholder: this.props.placeholder,
      className: { input: cls.input },
    });
  }

  registerPartial() {
    this.input.registerPartial();
    Handlebars.registerPartial('FormSearch', templateFormSearch);
  }

  render() {
    const classes = cn(cls.formSearch, [this.props.className]);

    return this.template({
      classes,
      name: this.props.name,
      placeholder: this.props.placeholder,
      input: this.input.render(),
    });
  }
}

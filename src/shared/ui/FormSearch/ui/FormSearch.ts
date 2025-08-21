import templateFormSearch from './FormSearch.hbs?raw';
import { Input } from '../../Input';
import { Component } from '@/shared/lib';
import { cn } from '../../../lib';
import cls from './FormSearch.module.scss';

interface FormSearchProps {
  name: string;
  placeholder?: string;
  className?: string;
}

export class FormSearch extends Component {
  constructor(props: FormSearchProps) {
    super({
      ...props,
      className: cn(cls.formSearch, [props.className]),
      input: new Input({
        name: 'searchChat',
        placeholder: props.placeholder,
        classNames: { input: cls.input },
      }),
    });
  }

  render() {
    return this.compile(templateFormSearch, {
      name: this.props.name,
      placeholder: this.props.placeholder,
    });
  }
}

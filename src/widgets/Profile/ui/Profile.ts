import Handlebars from 'handlebars';
import templateProfile from './Profile.hbs?raw';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { FormProfile } from '@/shared/ui/FormProfile';
import { cn } from '@/shared/lib/cn/cn';
import cls from './Profile.module.scss';

interface ProfileProps {
  className?: string;
}

export class Profile {
  public props: ProfileProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly avatar: Avatar;
  private readonly userName: Text;
  private readonly profileForm: FormProfile;

  constructor(props: ProfileProps) {
    this.props = props;
    this.template = Handlebars.compile(templateProfile);

    this.avatar = new Avatar({
      size: 'sizeL',
      src: 'https://images.unsplash.com/photo-1649000313856-7360316a546c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Аватар',
    });

    this.userName = new Text({
      tag: 'h3',
      size: 'sizeL',
      fontWeight: 'bold',
      text: 'Михаил',
    });

    this.profileForm = new FormProfile({
      name: 'profileForm',
    });
  }

  registerPartial() {
    Handlebars.registerPartial('Profile', templateProfile);
    this.avatar.registerPartial();
    this.userName.registerPartial();
    this.userName.registerPartial();
    this.profileForm.registerPartial();
  }

  render() {
    const classes = cn(cls.profile, [this.props.className]);

    return this.template({
      classes,
      classAvatarName: cls.wrapper,
      avatar: this.avatar.render(),
      userName: this.userName.render(),
      profileForm: this.profileForm.render(),
    });
  }
}

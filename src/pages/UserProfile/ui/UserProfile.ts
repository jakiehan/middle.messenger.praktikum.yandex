import Handlebars from 'handlebars';
import templateUserProfile from './UserProfile.hbs?raw';
import { Profile } from '@/widgets/Profile';
import { Button } from '@/shared/ui/Button';
import cls from './UserProfile.module.scss';
import { router } from '@/app/router';
import { getRouteMain } from '@/app/router/constants/routes.ts';

export class UserProfile {
  private readonly template: HandlebarsTemplateDelegate;
  private content: Profile;
  private backButton: Button;

  constructor() {
    this.template = Handlebars.compile(templateUserProfile);

    this.content = new Profile({});
    this.backButton = new Button({
      id: 'backButton',
      text: '←',
      type: 'button',
      className: cls.backButton,
      onClick: () => router.navigate(getRouteMain()),
    });
  }

  registerPartial() {
    this.content.registerPartial();
    this.backButton.registerPartial();
    Handlebars.registerPartial('UserProfile', templateUserProfile);
  }

  render(): string {
    return this.template({
      classes: cls.userProfile,
      classLeft: cls.left,
      content: this.content.render(),
      buttonBack: this.backButton.render(),
    });
  }

  mount() {
    this.backButton.mount();
  }

  destroy() {
    this.backButton.destroy();
  }
}

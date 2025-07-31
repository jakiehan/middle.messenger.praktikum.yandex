declare module '*.hbs' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

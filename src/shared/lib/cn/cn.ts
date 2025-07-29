export type Mods = Record<string, boolean | string | undefined | null>;
/**
 * Функция для генерации строки классов на основе базового класса, модификаторов и дополнительных классов.
 *
 * @param {string} cls - Базовый класс.
 * @param {Mods} [mods={}] - Объект с модификаторами, где ключ - имя класса, а значение - булево значение или строка.
 * @param {Array<string | undefined>} [additional=[]] - Массив дополнительных классов.
 * @returns {string} - Сформированная строка классов.
 */
export const cn = (
  cls: string,
  additional: Array<string | undefined> = [],
  mods: Mods = {}
): string => {
  const classes = new Set<string>();

  if (cls) {
    classes.add(cls);
  }

  additional.forEach((className) => {
    if (className) {
      classes.add(className);
    }
  });

  Object.entries(mods).forEach(([className, value]) => {
    if (Boolean(value)) {
      classes.add(className);
    }
  });

  return Array.from(classes).join(' ');
};

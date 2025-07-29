## Запуск проекта

```
npm install - устанавливаем зависимости
npm run dev - запуск frontend проекта в dev режиме
```

----

## О проекте

[Ссылка на макет дизайна](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f&t=U2ZbAcQrhNowAQKL-0)  

[Ссылка на netlify](https://nailya.netlify.app/)

На данном этапе:  
Выполнена базовая верстка, и настроен базовый роутинг — можно перемещаться между страницами по кнопкам и ссылкам.
Ссылки сверху добавлены только для удобства навигации, в будущем они будут удалены.

----

## Скрипты

- `npm run start` - Сборка и запуск сервера на 3000 порту
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером


----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [FSD](https://feature-sliced.design/docs/get-started/tutorial)

----


## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

----

## Конфигурация проекта

Для разработки проект содержит конфиг vite.config.ts

----

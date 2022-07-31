import React from 'react';

export type FormState = Record<string, string>;
export type ErrorsState = Record<string, string>;
export type event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export enum err {
  fieldRequired = 'Обязательное поле',
  nameExample = 'Имя - два слова, каждое от 3 до 30 символов',
  emailExample = 'Пример: itprofit@gmail.com',
  dateExample = 'Пример: 06.01.1998',
  numberExample = 'Пример: +79221110500',
  messageExample = 'Больше 10 сиволов, меньше 300',
}

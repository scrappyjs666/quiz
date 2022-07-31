import { useEffect, useMemo, useState } from 'react';
import InputMask from 'react-input-mask';
import cn from 'classnames';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Button } from 'antd';
import ru from 'date-fns/locale/ru';
import styles from './HomePage.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import logo from '../shared/assets/image/logo-new.svg';
import { Success } from '../components/UI/Success/Success';
import { Err } from '../components/UI/Err/Err';
import { FormState, ErrorsState, event, err } from './typesEnum';
import { postForm } from '../api/postForm';
import 'antd/dist/antd.css';
import { formNote } from '../helpers/formNote';

export const HomePage = () => {
  registerLocale('ru', ru);
  const initialState = { name: '', email: '', number: '', date: '', userMessage: '' };
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorsState>(initialState);
  const [sending, setIsSending] = useState(false);

  const isValidForm = useMemo(() => Object.values(errors).every((item) => !item), [errors]);

  const validateForm = () => {
    Object.keys(form).forEach((name) => {
      const value = form[name];
      let message = '';

      if (name === 'name') {
        if (value === '') message = err.fieldRequired;
        else if (!/^[A-zА-яёЁ]{3,30} [A-zА-яёЁ]{3,30}$/.test(value)) message = err.nameExample;
      }

      if (name === 'email') {
        if (value === '') message = err.fieldRequired;
        else if (!/^\w+?@\w+?\.\w{2,3}$/.test(value)) message = err.emailExample;
      }

      if (name === 'number') {
        if (value === '') message = err.fieldRequired;
        else if (value.length && value.includes('_')) message = err.numberExample;
      }

      if (name === 'date') {
        if (startDate === null) message = err.fieldRequired;
      }

      if (name === 'userMessage') {
        if (value === '') message = err.fieldRequired;
        else if (value.length < 10 && value.length < 300) message = err.messageExample;
      }

      return setErrors((prev) => ({ ...prev, [name]: message }));
    });
  };

  const handleChange = (e: event) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: name === 'name' ? value.toUpperCase() : value }));
  };

  useEffect(() => {
    validateForm();
    form.date = String(startDate?.toLocaleDateString());
  }, [form, startDate]);

  const clearFields = () => {
    setForm(initialState);
    setStartDate(null);
  };

  const verifyForm = async () => {
    if (isValidForm) {
      setIsSending(true);
      const response = await postForm(form);
      if (response instanceof Error) {
        formNote('error', 'Произошла ошибка, попробуйте позже');
      } else {
        formNote('success', 'Благодарим за обратную связь!');
        clearFields();
      }
      setIsSending(false);
    }
    if (!isValidForm) formNote('warning', 'Заполните все поля формы, пожалуйста!');
  };

  return (
    <form className={styles.form__wrap}>
      <img className={styles.form__logo} src={logo} alt="logo" />
      <input placeholder="Иванов Иван" className={styles.input} name="name" value={form.name} onChange={handleChange} />
      {errors.name ? <Err error={errors.name} /> : <Success />}
      <input
        placeholder="itprofit@gmail.com"
        className={styles.input}
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email ? <Err error={errors.email} /> : <Success />}
      <InputMask
        placeholder="+7 (999) 999-99-99"
        className={styles.input}
        name="number"
        mask="+7 (999) 999-99-99"
        value={form.number}
        onChange={handleChange}
      />
      {errors.number ? <Err error={errors.number} /> : <Success />}
      <div />
      <DatePicker
        placeholderText="06.01.1998"
        selected={startDate}
        className={styles.input}
        onChange={(date) => setStartDate(date)}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale="ru"
      />
      {errors.date ? <Err error={errors.date} /> : <Success />}
      <textarea
        placeholder="Введите Ваше сообщение"
        className={cn(styles.input, styles.textarea)}
        name="userMessage"
        value={form.userMessage}
        onChange={handleChange}
      />
      {errors.userMessage ? <Err error={errors.userMessage} /> : <Success />}
      <Button disabled={sending} onClick={verifyForm} type="primary">
        Отправить
      </Button>
    </form>
  );
};

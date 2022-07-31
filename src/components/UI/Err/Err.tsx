import React from 'react';
import styles from './Err.module.scss';

interface type {
  error: string;
}

export const Err: React.FC<type> = ({ error }) => {
  return <div className={styles.error__text}>{error}</div>;
};

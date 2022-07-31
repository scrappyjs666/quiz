import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import styles from './Success.module.scss';

export const Success = () => {
  return (
    <div className={styles.success}>
      <IoCheckmarkCircleOutline color="#17d927" />
      <div className={styles.success__text}>success</div>
    </div>
  );
};

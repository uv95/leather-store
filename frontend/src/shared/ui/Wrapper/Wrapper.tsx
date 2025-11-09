import { ReactNode } from 'react';
import Back from '../Back/Back';
import styles from './Wrapper.module.scss';

type WrapperProps = {
  children: ReactNode;
  heading: string;
};

const Wrapper = ({ children, heading }: WrapperProps) => {
  return (
    <div className={styles.Wrapper}>
      <Back />
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Wrapper;

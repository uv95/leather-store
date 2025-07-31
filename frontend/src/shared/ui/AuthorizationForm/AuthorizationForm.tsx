import { FormEvent, ReactNode } from 'react';
import styles from './AuthorizationForm.module.scss';

interface AuthorizationFormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
}

const AuthorizationForm = ({
  children,
  onSubmit,
  title,
}: AuthorizationFormProps) => {
  return (
    <div className={styles.AuthorizationForm}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthorizationForm;

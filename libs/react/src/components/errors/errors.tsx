import styles from './errors.module.scss';

/* eslint-disable-next-line */
export interface ErrorsProps {}

export function Errors(props: ErrorsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Errors!</h1>
    </div>
  );
}

export default Errors;

import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styles from "./styles/styles.module.scss"

function Input(props: any) {
  const { labeled, label, name, noError, ...rest } = props;
  return (
    <div className={styles.Input}>
      {labeled && <label htmlFor={name}>{label}</label>}
      <Field id={name} name={name} {...rest} autoComplete="new-password" />
      {!noError && <ErrorMessage component={TextError} name={name} />}
    </div>
  );
}

export default Input;

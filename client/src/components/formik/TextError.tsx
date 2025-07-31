import styles from "./styles/styles.module.scss";

function TextError(props: any) {
  return (
    <div className={styles.error}>
      {/* display only first error */}
      {props.children[0]}
    </div>
  );
}

export default TextError;

import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Select(props: any) {
  const { name, options, ...rest } = props;
  return (
    <div className="form-control">
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option: any) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;

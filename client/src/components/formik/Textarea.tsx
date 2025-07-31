import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props: any) {
  const { name, ...rest } = props;
  return (
    <div className="form-control">
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Textarea;

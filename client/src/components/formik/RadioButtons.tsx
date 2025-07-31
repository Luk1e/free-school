import React from "react";
import { Field } from "formik";

function RadioButtons(props: any) {
  const { name, options, ...rest } = props;
  return (
    <>
      <Field name={name}>
        {({ field }: any) => {
          return options.map((option: any) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.key}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                {option.label}
              </React.Fragment>
            );
          });
        }}
      </Field>
    </>
  );
}

export default RadioButtons;

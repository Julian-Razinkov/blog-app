import { useFormikContext } from "formik";
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

export function TextInput(props: Omit<MuiTextFieldProps, 'name' | 'onChange' | 'value' | 'error' | 'helperText'> & {
  name: string;
}) {

  const { values, setFieldValue, errors } = useFormikContext<any>()

  return (
    <MuiTextField
      {...props}
      label={props.label}
      onChange={(event) => setFieldValue(props.name, event.target.value)}
      value={values[props.name]}
      error={errors[props.name] != null}
      helperText={errors[props.name] != null && errors[props.name] as string}
    />
  )

}

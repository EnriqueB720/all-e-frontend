import { ChangeEvent } from "react";


export interface FieldProps {
  label: string;
  name: string;
  fieldColor?:string;
  inputPlaceholder?: string;
  inputValue?: string | undefined;
  isRequired?: boolean;
  isErrors?: boolean;
  errorMessage?: string;
  isSubmitting?: boolean;
  isPassword?: boolean;
  onChange?: (e: string | ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
}
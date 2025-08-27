import * as yup from "yup";

//TODO: add translation hook once done!
export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
})
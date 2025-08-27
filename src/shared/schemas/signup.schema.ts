import * as yup from "yup";

const passwordRules =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//TODO: add translation hook once done!

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required').matches(passwordRules, 'Password must have characters lowercase and uppercase and numbers'),
  repeatPassword: yup.string().required('Re-type your password').oneOf([yup.ref('password')], 'Passwords must match'), 
  username: yup.string().required('Username is required'),
})
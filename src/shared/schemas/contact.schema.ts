import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  message: yup.string().min(5, 'Message is too short').required('Required'),
});

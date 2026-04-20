import * as yup from "yup";

import { Translator } from "@types";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const createSignUpSchema = (t: Translator) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('global.error.invalidEmail'))
      .required(t('global.error.required')),
    username: yup.string().required(t('global.error.required')),
    password: yup
      .string()
      .min(8, t('global.error.tooShort'))
      .required(t('global.error.required'))
      .matches(passwordRules, t('global.error.invalidPassword')),
    repeatPassword: yup
      .string()
      .required(t('global.error.required'))
      .oneOf([yup.ref('password')], t('global.error.invalidConfirmPassword')),
  });

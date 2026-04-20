import * as yup from "yup";

import { Translator } from "@types";

export const createLoginSchema = (t: Translator) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('global.error.invalidEmail'))
      .required(t('global.error.required')),
    password: yup
      .string()
      .min(8, t('global.error.tooShort'))
      .required(t('global.error.required')),
  });

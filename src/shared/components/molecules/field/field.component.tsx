import * as React from 'react';

import _ from 'lodash';

import { FieldProps } from '@types';
import { Field as CKField } from '@chakra-ui/react';
import { Input, PasswordInput } from '@components';

const defaultFieldColor = { base: 'gray.900', _dark: 'white' };

const Field: React.FC<FieldProps> = ({
  label,
  name,
  fieldColor,
  inputPlaceholder,
  inputValue,
  isRequired,
  isErrors,
  errorMessage,
  isSubmitting,
  isPassword,
  onChange,
  onBlur
}) => {
  const resolvedColor = fieldColor || defaultFieldColor;

  return (
    <CKField.Root
      mb={2}
      mr={2}
      invalid={isErrors}
      required={isRequired}
      disabled={isSubmitting}
      onBlur={onBlur}
    >
      <CKField.Label color={resolvedColor as any}>{label}</CKField.Label>
      {!isPassword ?
        <Input
          onChange={onChange}
          type="text"
          name={name}
          placeholder={inputPlaceholder}
          value={inputValue}
          color={resolvedColor as any}
        />
        :
        <PasswordInput
          onChange={onChange}
          name={name}
          placeholder={inputPlaceholder}
          value={inputValue}
          color={resolvedColor as any}
        />
      }
      {isErrors && <CKField.ErrorText>{errorMessage}</CKField.ErrorText>}
    </CKField.Root>
  )

}

export default React.memo(Field, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});

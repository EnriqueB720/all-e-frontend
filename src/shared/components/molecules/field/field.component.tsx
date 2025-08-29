import * as React from 'react';

import _ from 'lodash';

import { FieldProps } from '@types';
import {
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/form-control"
import { Input, PasswordInput } from '@components';

const Field: React.FC<FieldProps> = ({
  label,
  name,
  fieldColor = 'black',
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

  return (
    <FormControl
      mb={2}
      mr={2}
      isInvalid={isErrors}
      isRequired={isRequired}
      isDisabled={isSubmitting}
      onBlur={onBlur}
      color={fieldColor}>
      <FormLabel color={fieldColor}>{label}</FormLabel>
      {!isPassword ?
        <Input
          onChange={onChange}
          type="text"
          name={name}
          placeholder={inputPlaceholder}
          value={inputValue}
        />
        :
        <PasswordInput />
      }
      {isErrors && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )

}

export default React.memo(Field, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});
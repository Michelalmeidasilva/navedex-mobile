import React, { FC, useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Column, Input, RowProps } from 'src/components';

interface DatePickerProps extends RowProps {
  value: any;
  label: string;
  error: any;
  name: string;
  defaultValue: Date;
  placeholder: string;
  minDate?: Date;
  maxDate: Date;
  onChange: any;
  setValue: any;
}

const DatePicker: FC<DatePickerProps> = ({
  value,
  label,
  error,
  name,
  minDate,
  setValue,
  defaultValue,
  maxDate,
  placeholder,
  onChange,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(value);

  const onChangeTest = (event: any, selectedDate: any) => {
    setShow(false);
    setDate(selectedDate || date);
    setValue(name, selectedDate);
  };

  return (
    <>
      <Column {...props}>
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
          <Input
            editable={false}
            value={date && format(date, 'dd/MM/yyyy')}
            label={label}
            onChangeText={onChange}
            placeholder={placeholder}
            error={error}
          />
        </TouchableWithoutFeedback>
      </Column>

      {show && (
        <DateTimePicker
          display='spinner'
          testID='dateTimePicker'
          value={date || defaultValue || new Date(1998, 6, 24)}
          mode={'date'}
          maximumDate={maxDate}
          minimumDate={minDate}
          onChange={onChangeTest}
        />
      )}
    </>
  );
};

export default DatePicker;

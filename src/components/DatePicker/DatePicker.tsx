import React, { FC, useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Column, Input, RowProps } from 'src/components';

interface DatePickerProps extends RowProps {
  value: Date;
  label: string;
  error: any;
  disabled: boolean;
  name: string;
  placeholder: string;
  minAge: Date;
  maxAge: Date;
}

const DatePicker: FC<DatePickerProps> = ({
  value,
  label,
  error,
  disabled,
  name,
  minAge,
  maxAge,
  placeholder,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(value);

  const onChange = (event: any, selectedDate: Date) => {
    setDate(selectedDate || date);
    setShow(false);
  };

  useEffect(() => {
    console.log(date);
  }, [date]);

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
          value={date || new Date(1998, 6, 24)}
          mode={'date'}
          maximumDate={maxAge || new Date(2008, 10, 25)}
          minimumDate={minAge}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DatePicker;

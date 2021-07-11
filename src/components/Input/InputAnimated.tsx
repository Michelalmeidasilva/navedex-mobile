// import React, { FC, useState, useEffect, useRef } from 'react';
// import { TextInputProps, TouchableOpacity, Platform } from 'react-native';
// import styled from 'styled-components/native';

// import { Animated } from 'react-native';

// import { Column, Text, ColumnProps, Icon, Row } from 'src/components';

// interface InputComponentProps extends ColumnProps {
//   name: string;
//   value: any;
//   icon?: string;
//   disabled?: boolean;
//   error?: string;
//   type?: string;
//   label?: string;
//   labelBackground?: string;
//   textArea?: boolean;
//   actionButton?: boolean;
//   action?: Function;
//   handleChange: Function;
// }

// interface StyledColumnProps extends ColumnProps {
//   isFocused: boolean;
//   error?: string;
//   disabled?: boolean;
//   multiline?: boolean;
// }

// interface StyledInputProps extends TextInputProps {
//   name: string;
//   autoCapitalize: 'none';
//   error?: string;
//   type?: string;
//   labelBackground?: string;
// }

// const getColor = (
//   isFocused: boolean,
//   disabled?: boolean,
//   error?: string,
//   onlyLabel?: boolean
// ): string => {
//   if (!!error) {
//     return '#FF4D3B';
//   }

//   if (isFocused) {
//     return onlyLabel ? '#92A3AE' : '#9DE0E6';
//   }

//   return disabled ? '#BDBDBD' : '#9E9E9E';
// };

// const InputComponent: FC<InputComponentProps> = ({
//   name,
//   handleChange,
//   label,
//   error,
//   type,
//   value,
//   disabled,
//   labelBackground,
//   textArea,
//   icon,
//   actionButton,
//   action,
//   ...props
// }) => {
//   const [isInputFocused, setIsInputFocused] = useState(false);

//   const labelY = useRef(new Animated.Value(0)).current;

//   const color = getColor(isInputFocused, disabled, error, true);

//   const textAnimatedStyle = {
//     fontSize: labelY.interpolate({
//       inputRange: [0, 1],
//       outputRange: [16, 10]
//     }),
//     lineHeight: labelY.interpolate({
//       inputRange: [0, 1],
//       outputRange: [24, 16]
//     }),
//     color: color
//   };

//   const labelAnimatedStyle = {
//     translateY: labelY.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, -16]
//     })
//   };

//   useEffect(() => {
//     Animated.timing(labelY, {
//       toValue: isInputFocused || !!value ? 1 : 0,
//       duration: 300,
//       useNativeDriver: false
//     }).start();
//   }, [labelY, isInputFocused, value]);

//   return (
//     <Column {...props}>
//       <StyledColumn
//         position='relative'
//         isFocused={isInputFocused}
//         error={error}
//         disabled={disabled}
//         multiline={textArea}
//         alignItems='center'
//         {...props}
//       >
//         <StyledInput
//           autoCapitalize='none'
//           name={name}
//           value={value}
//           error={error}
//           type={type}
//           secureTextEntry={type === 'password'}
//           editable={!disabled}
//           labelBackground={labelBackground ? labelBackground : 'white'}
//           onFocus={(): void => {
//             setIsInputFocused(true);
//           }}
//           onBlur={(): void => setIsInputFocused(false)}
//           onChangeText={(text: any): void => {
//             handleChange(name, text);
//           }}
//           multiline={textArea}
//         />

//         <Column
//           as={Animated.View}
//           position='absolute'
//           zIndex={-1}
//           left={10}
//           pl={2}
//           pr={2}
//           top={6}
//           style={labelAnimatedStyle}
//           backgroundColor={labelBackground ? labelBackground : 'white'}
//           borderRadius={4}
//         >
//           <Text as={Animated.Text} style={textAnimatedStyle}>
//             {label}
//           </Text>
//         </Column>

//         {icon && (
//           <Icon icon={icon} color={getColor(isInputFocused, disabled, error)} marginRight={10} />
//         )}

//         {actionButton && (
//           <TouchableOpacity style={{ marginRight: 10 }} onPress={(): void => action && action()}>
//             <Icon
//               icon={type === 'password' ? 'eye' : 'eyeSlash'}
//               color={getColor(isInputFocused, disabled, error)}
//             />
//           </TouchableOpacity>
//         )}
//       </StyledColumn>

//       {error && (
//         <Row alignItems='center' marginTop='4px'>
//           <Icon icon='error' />

//           <Text variant='smaller' color='#FF4D3B' marginLeft='7px'>
//             {error}
//           </Text>
//         </Row>
//       )}
//     </Column>
//   );
// };

// const StyledColumn = styled.View<StyledColumnProps>`
//   ${({ isFocused, error, disabled, multiline }): string => {
//     const disabledCss = `
//       border-color: #BDBDBD;
//     `;
//     const focusedCss = `
//       border-color: #9DE0E6;
//     `;
//     const errorCss = `
//       border-color: #FF4D3B;
//     `;
//     const textAreaStyle = `
//       height: 120px;
//     `;

//     return `
//       align-items: center;
//       height: 40px;
//       flex-direction: row;
//       border: 1px solid #9E9E9E;
//       border-radius: 4px;
//       background-color: transparent;

//       ${isFocused ? focusedCss : ''}
//       ${error ? errorCss : ''}
//       ${disabled ? disabledCss : ''}
//       ${multiline ? textAreaStyle : ''}

//     `;
//   }}
// `;

// const StyledInput = styled.TextInput.attrs(({ multiline, ...props }) => ({
//   textAlignVertical: multiline && Platform.OS === 'android' && 'top',
//   ...props
// }))<StyledInputProps>`
//   flex: 1;
//   height: 100%;
//   padding: 8px 12px;
//   color: #58595b;
//   border-radius: 4px;
//   background-color: transparent;
// `;

// export default InputComponent;

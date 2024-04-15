import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  name: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { name, onPress, variant, disabled } = props;
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      style={[
        styles.container,
        variant === 'secondary' && variant === 'secondary' && styles.secondary,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, variant === 'secondary' && { color: 'black' }]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2ba1dd',
    width: '100%',
    borderRadius: 12,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'MulishSemiBold',
    fontSize: 24,
  },
  secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
});

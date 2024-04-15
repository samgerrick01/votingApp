import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

type TextInputProps = {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  password?: boolean;
  email?: boolean;
  validate?: boolean;
};

const TextInputComponent = (props: TextInputProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const { value, onChangeText, placeholder, password, email, validate } = props;

  const validateEmail = (text: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (text === '') setError('');
    if (!emailRegex.test(text) && text !== '') {
      setError('Invalid Email');
    } else {
      setError('');
    }

    setIsValid(emailRegex.test(text));
    onChangeText(text);
  };

  return (
    <View style={styles.mainView}>
      <View
        style={[styles.secondaryView, onFocus && { borderBottomColor: 'cyan' }]}
      >
        <TextInput
          style={[styles.textInput, email && !isValid && { color: 'red' }]}
          value={value}
          onChangeText={(text) => {
            if (props.email) {
              validateEmail(text);
            } else {
              onChangeText(text);
            }
          }}
          placeholder={placeholder}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          placeholderTextColor={'darkgrey'}
          secureTextEntry={show ? false : password ? true : false}
        />
      </View>
      {validate && error && (
        <Text style={{ color: 'red', marginHorizontal: 20 }}>{error}</Text>
      )}
      {password && (
        <Pressable onPress={() => setShow(!show)} style={styles.passwordView}>
          <CheckBox
            onPress={() => setShow(!show)}
            checked={show ? true : false}
          />
          <Text style={styles.passwordText}>Show Password</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { width: '100%', marginVertical: 20 },
  secondaryView: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginHorizontal: 20,
  },
  textInput: {
    height: 50,
    fontSize: 20,
    fontFamily: 'MulishRegular',
    color: 'black',
  },
  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordText: { fontSize: 16 },
});

export default TextInputComponent;

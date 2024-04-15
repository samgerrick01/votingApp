import Button from '@/src/components/Button';
import TextInputComponent from '@/src/components/TextInput';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onSubmit = () => {
    console.warn('Test Submit');
  };

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && password && emailRegex.test(email) && password.length > 5) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [email, password]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <StatusBar style='light' />
        <Image
          source={require('@assets/images/background.png')}
          style={styles.bgImg}
        />

        <View style={styles.lightIcon}>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            style={{ height: 225, width: 90 }}
            source={require('@assets/images/light.png')}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(1000).springify()}
            style={{ height: 160, width: 65 }}
            source={require('@assets/images/light.png')}
          />
        </View>

        <View style={styles.wrapper}>
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            style={styles.titleWrapper}
          >
            <Text style={styles.titleText}>Lemery Colleges</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            style={styles.titleWrapper}
          >
            <Text style={[styles.titleText, { fontSize: 24 }]}>
              [User Login Screen]
            </Text>
          </Animated.View>

          <TextInputComponent
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            email
            validate
          />
          <TextInputComponent
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            password
          />

          <View style={{ gap: 20 }}>
            <Animated.View
              style={{ marginHorizontal: 20 }}
              entering={FadeInDown.duration(1000).springify()}
            >
              <Button
                name='Login'
                onPress={onSubmit}
                variant='primary'
                disabled={btnDisabled}
              />
            </Animated.View>

            <Animated.View
              style={{ marginHorizontal: 20 }}
              entering={FadeInDown.duration(1000).springify()}
            >
              <Button
                name='Administrator Login'
                onPress={() => router.push('/(auth)/administrator')}
                variant='secondary'
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  lightIcon: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    position: 'absolute',
  },
  bgImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  text: {
    fontFamily: 'MulishRegular',
    fontSize: 24,
    color: '#fff',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontFamily: 'MulishSemiBold',
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

import {
  Mulish_400Regular,
  Mulish_600SemiBold,
} from '@expo-google-fonts/mulish';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    MulishRegular: Mulish_400Regular,
    MulishSemiBold: Mulish_600SemiBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* <StatusBar style='light' hidden /> */}
        <Animated.View style={{ flex: 1 }} entering={FadeIn}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          </Stack>
        </Animated.View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

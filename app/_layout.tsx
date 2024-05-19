import { Stack } from 'expo-router';
import 'react-native-reanimated';


function RootLayoutNav() {

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
  );
}


export default RootLayoutNav;
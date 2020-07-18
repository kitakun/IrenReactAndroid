import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/Home.Screen';
import DoTestScreen from './screens/DoTest.Screen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="DoTest"
            component={DoTestScreen}
            options={({ route }) => ({ title: `File: ${(route.params as any).filename} (${(route.params as any).data.length})` })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

AppRegistry.registerComponent('Iren React Native Tesst Launcher', () => App);

export default App;

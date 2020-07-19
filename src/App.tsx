import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Screens
import HomeScreen from './screens/Home.Screen';
import DoTestScreen from './screens/DoTest.Screen';
import TestResultScreen from './screens/TestResult.Screen';

// States
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './state/store';

export const store = createStore(rootReducer);

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
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
            <Stack.Screen
              name="TestResults"
              component={TestResultScreen}
              options={({ route }) => ({ title: 'Результаты теста:' })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent('Iren React Native Tesst Launcher', () => App);

export default App;

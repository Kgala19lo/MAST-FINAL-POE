// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import StarterScreen from './screens/StarterScreen';
import MainScreen from './screens/MainScreen';
import DessertScreen from './screens/DessertScreen';
import MenuEditorScreen from './MenuEditorScreen';
import MenuFilterScreen from './MenuFilterScreen';

import { MenuProvider } from './context/MenuContext';
import type { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Starter" component={StarterScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Dessert" component={DessertScreen} />
          <Stack.Screen name="MenuEditor" component={MenuEditorScreen} />
          <Stack.Screen name="Filter" component={MenuFilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
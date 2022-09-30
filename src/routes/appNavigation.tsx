import React from 'react';
import {
  NavigationContainer,
  Theme as NativeTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Interface Imports
import {RootStackParamList} from '../interfaces/screens';

// Screen/Page Imports
import HomeScreen from '../screens/homeScreen';
import {LibraryScreen} from '../screens/libraryScreen';
import {AddBookScreen} from '../screens/addBookScreen';

// Component Imports
import {Header} from '../components/header';

// Create Root Navigation Stack
const RootStack = createStackNavigator<RootStackParamList>();

interface AppNavigationProps extends React.PropsWithChildren {
  theme: NativeTheme;
}

export const AppNavigation = ({theme}: AppNavigationProps) => {
  return (
    <NavigationContainer theme={theme as NativeTheme}>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{header: Header}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Library" component={LibraryScreen} />
        <RootStack.Screen name="Add Book" component={AddBookScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

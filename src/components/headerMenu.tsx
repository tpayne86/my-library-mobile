import React from 'react';
import {Menu, Appbar, Divider, useTheme} from 'react-native-paper';
import { useAuthContext } from '../context/authContext';
import { PreferencesContext } from '../context/themeContext';

export const HeaderMenu = ({anchor, visible, closeMenu}) => {
  const {accessToken, signIn, signOut} = useAuthContext();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);


  const loggedIn = accessToken !== '';

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
      <Menu.Item
        onPress={() => {
          if (toggleTheme) {
            toggleTheme();
          }
        }}
        title="Toggle Dark Mode"
      />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <Menu.Item
        icon={loggedIn ? 'logout' : 'login'}
        onPress={() => (loggedIn ? signOut() : signIn())}
        title={loggedIn ? 'SignOut' : 'SignIn'}
      />
    </Menu>
  );
};

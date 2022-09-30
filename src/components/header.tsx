import {StackHeaderProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useTheme, Appbar} from 'react-native-paper';

import {useAuthContext} from '../context/authContext';

import {HeaderMenu} from './headerMenu';

export const Header = ({route: {name}, navigation}: StackHeaderProps) => {
  const {user} = useAuthContext();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      <Appbar.Content title={name} />
      {user ? (
        <Appbar.Action
          icon={name === 'Home' ? 'book' : 'home'}
          onPress={() =>
            name === 'Home'
              ? navigation.navigate('Library')
              : navigation.navigate('Home')
          }
        />
      ) : (
        ''
      )}
      <HeaderMenu
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        closeMenu={closeMenu}
        visible={visible}
      />
    </Appbar.Header>
  );
};

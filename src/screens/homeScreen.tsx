import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import { useAuthContext } from '../context/authContext';

export default function HomeScreen() {
  const {user} = useAuthContext();
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    viewStyle: {
      color: 'black',
    },
  });

  return (
    <>
      {user ? (
        <Text style={styles.viewStyle}>{`Welcome ${user.givenName}`}</Text>
      ) : (
        <Text style={styles.viewStyle}>Please Login</Text>
      )}
    </>
  );
}

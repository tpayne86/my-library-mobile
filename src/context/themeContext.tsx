import React, {PropsWithChildren, useContext, useEffect} from 'react';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';

interface PreferencesContextValues {
  isThemeDark: boolean;
  toggleTheme?: () => void;
  theme?: PaperTheme | Theme;
}

export const CombinedDefaultTheme = merge(
  PaperDefaultTheme,
  NavigationDefaultTheme,
);
export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const PreferencesContext = React.createContext<PreferencesContextValues>(
  {
    isThemeDark: true,
    theme: CombinedDarkTheme,
    toggleTheme: () => {},
  },
);

export const useThemeContext = () => useContext(PreferencesContext);

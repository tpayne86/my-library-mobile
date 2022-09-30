/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// Module imports
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import {AppProvider, UserProvider} from '@realm/react';

// Constant imports
import {REALM_APP_ID} from './src/constants/realm';

// Context imports
import {AuthProvider} from './src/context/authContext';
import {
  PreferencesContext,
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/context/themeContext';
import {BookRealmProvider} from './src/db/index';

// Navigation import
import {AppNavigation} from './src/routes/appNavigation';

const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <AppProvider id={REALM_APP_ID}>
      <UserProvider>
        <BookRealmProvider sync={{partitionValue: 'MyLibrary'}}>
          <AuthProvider>
            <PreferencesContext.Provider value={preferences}>
              <PaperProvider theme={theme as PaperTheme}>
                <AppNavigation theme={theme} />
              </PaperProvider>
            </PreferencesContext.Provider>
          </AuthProvider>
        </BookRealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default App;

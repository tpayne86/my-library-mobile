import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import Auth0 from 'react-native-auth0';
import {REALM_APP_ID} from '../constants/realm';

import auth0Config from '../utils/auth0.config';

const auth0 = new Auth0(auth0Config);

interface AuthContextValues {
  accessToken: string | null;
  user: User | null;
  userId?: string;
  realmUser?: Realm.User<
    Realm.DefaultFunctionsFactory,
    SimpleObject,
    Realm.DefaultUserProfileData
  >;
  signIn?: () => void;
  signOut?: () => void;
}

interface User {
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updatedAt: string;
}

export const AuthContext = createContext<AuthContextValues>({
  accessToken: '',
  user: null,
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const realmApp = Realm.App.getApp(REALM_APP_ID);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [realmUser, setRealmUser] =
    useState<
      Realm.User<
        Realm.DefaultFunctionsFactory,
        SimpleObject,
        Realm.DefaultUserProfileData
      >
    >();

  const signIn = () => {
    console.log('signIn');
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(async creds => {
        const realmCreds = Realm.Credentials.jwt(creds.idToken);
        try {
          const loggedInRealmUser = await realmApp.logIn(realmCreds);
          setRealmUser(loggedInRealmUser);
        } catch (err: any) {
          console.error(err.message);
        }
        auth0.auth.userInfo({token: creds.accessToken}).then(userInfo => {
          console.log(userInfo);
          setUser(userInfo);
          setUserId(userInfo.sub.split('|')[1]);
        });
        console.log(creds);
        setAccessToken(creds.accessToken);
      });
  };

  const signOut = () => {
    auth0.webAuth.clearSession({}).then(async () => {
      await realmApp.currentUser?.logOut();
      setAccessToken('');
    });
  };

  return (
    <AuthContext.Provider
      value={{accessToken, user, userId, realmUser, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

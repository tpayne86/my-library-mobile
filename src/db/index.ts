import {createRealmContext} from '@realm/react';
import {REALM_APP_ID} from '../constants/realm';
import {BookSchema, ImageLinkSchema} from './bookSchema';

const appConfig = {
  id: REALM_APP_ID,
};

export const realmApp = new Realm.App(appConfig);

let config: Realm.Configuration = {
  schema: [BookSchema, ImageLinkSchema],
  schemaVersion: 5,
};

const BookRealmContext = createRealmContext(config);

export const {
  useRealm,
  useQuery,
  useObject,
  RealmProvider: BookRealmProvider,
} = BookRealmContext;

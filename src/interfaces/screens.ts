import Realm from 'realm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookSchema} from '../db/bookSchema';
import {Book} from './books';

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  'Add Book': undefined;
};

export interface ListBookItemInfo {
  item: BookSchema & Realm.Object;

  index?: number;

  seperators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leadind' | 'trailing', newProps: any) => void;
  };
}
export type LibraryProps = NativeStackScreenProps<
  RootStackParamList,
  'Library'
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export interface BookMenuProps {
  book: Book;
}

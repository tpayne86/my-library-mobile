import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useUser} from '@realm/react';

import BarcodeReader from '../components/barcodeReader';
import BookCard from '../components/bookCard';

import searchBook from '../utils/google-book-search';
import {RootStackParamList} from '../interfaces/screens';
import {Book, GoogleBook} from '../interfaces/books';
import {useRealm} from '../db';
import {BookSchema} from '../db/bookSchema';

type Props = NativeStackScreenProps<RootStackParamList, 'Add Book'>;

export const AddBookScreen = ({navigation}: Props) => {
  const Realm = useRealm();
  const realmUser = useUser();

  const [scannedISBN, setScannedIsbn] = useState<String>('');
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [bookInfo, setBookInfo] = useState<Book>();
  const [bookInfoVisible, setBookInfoVisible] = useState<boolean>(false);

  const verifyISBN = (string: String): void => {
    let res = string.match(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g);
    // console.log(res.length);
    if (Array.isArray(res) && res.length > 0) {
      setScannedIsbn(string);
      setIsScanned(true);
    }
  };

  const handleRescan = () => {
    //console.log('pressed');
    setScannedIsbn('');
    setIsScanned(false);
    setBookInfo(undefined);
  };

  const handleBookLookUp = () => {
    //console.log('pressed');
    searchBook(scannedISBN, (json: GoogleBook) => {
      setBookInfo(json);
      setBookInfoVisible(true);
    });
  };

  const handleAddBook = () => {
    setBookInfoVisible(false);
    Realm.write(() => {
      if (realmUser) {
        Realm.create(
          'Book',
          BookSchema.generate(bookInfo as GoogleBook, realmUser?.id),
        );
      }
    });
    navigation.navigate('Library');
  };

  return (
    <>
      {isScanned && bookInfoVisible ? (
        <View>
          <BookCard bookInfo={bookInfo as GoogleBook} />
          <Button
            title="Add Book"
            onPress={() => {
              //console.log(`Adding the following book: ${bookInfo?.title}`);
              handleAddBook();
            }}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setBookInfoVisible(false);
            }}
          />
        </View>
      ) : isScanned && !bookInfoVisible ? (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Text>ISBN: {scannedISBN}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                handleBookLookUp();
              }}
              title="LookUp Book"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                handleRescan();
              }}
              title="reset"
            />
          </View>
        </View>
      ) : !isScanned ? (
        <BarcodeReader verifyISBN={verifyISBN} />
      ) : (
        ''
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

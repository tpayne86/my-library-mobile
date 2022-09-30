/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Pressable, Button, FlatList, StyleSheet} from 'react-native';
import {
  Avatar,
  List,
  Dialog,
  FAB,
  Text,
  Menu,
  IconButton,
  Divider,
} from 'react-native-paper';

import {useQuery, useRealm} from '../db';
import {BookSchema} from '../db/bookSchema';

import {Book} from '../interfaces/books';
import {
  BookMenuProps,
  LibraryProps,
  ListBookItemInfo,
} from '../interfaces/screens';

import BookCard from '../components/bookCard';
import {useUser} from '@realm/react';

export const LibraryScreen = ({navigation}: LibraryProps) => {
  const realm = useRealm();
  const realmUser = useUser();
  const books = useQuery(BookSchema);

  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [openBook, setOpenBook] = useState<Book | null>(null);

  useEffect(() => {
    const updateSubscriptions = async () => {
      if (realmUser) {
        await realm.subscriptions.update(mutableSubs => {
          let ownBooks = realm
            .objects('Book')
            .filtered(`userId == "${realmUser.id}`);
          mutableSubs.add(ownBooks, {name: 'ownBooks'});
        });
      }
    };
    updateSubscriptions();
  }, [realm, realmUser]);

  const handleOpenBook = (book: any) => {
    setOpenBook(book);
    setIsBookOpen(true);
  };

  const handleCloseBook = () => {
    setOpenBook(null);
    setIsBookOpen(false);
  };

  const BookMenu = ({book}: BookMenuProps) => {
    const [visible, setVisible] = useState(false);

    const handleCloseMenu = () => setVisible(false);
    const handleOpenMenu = () => setVisible(true);

    const handleAddCopy = () => {
      realm.write(() => {
        if (book !== undefined && book.qty !== undefined) {
          book.qty++;
        }
      });
    };
    const handleRemoveCopy = () => {
      realm.write(() => {
        if (book !== undefined && book.qty !== undefined) {
          book.qty--;
        }
      });
    };

    const handleDeleteBook = () => {
      if (book) {
        realm.write(() => {
          realm.delete(book);
        });
      }
    };

    return (
      <Menu
        visible={visible}
        onDismiss={handleCloseMenu}
        anchor={<IconButton icon="dots-vertical" onPress={handleOpenMenu} />}>
        <Menu.Item
          onPress={handleAddCopy}
          title="Add a copy"
          style={{
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'blue',
            backgroundColor: 'rgb(135,206,250)',
          }}
          titleStyle={{textAlign: 'center'}}
        />
        <Menu.Item
          onPress={handleRemoveCopy}
          title="Remove a copy"
          style={{
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'red',
            backgroundColor: 'rgb(250,135,149)',
          }}
          titleStyle={{textAlign: 'center'}}
        />
        <Divider />
        <Menu.Item
          onPress={handleDeleteBook}
          title="Delete"
          style={{backgroundColor: 'red', borderRadius: 4}}
          titleStyle={{textAlign: 'center'}}
        />
      </Menu>
    );
  };

  const RenderBookRows = ({item}: ListBookItemInfo) => {
    return (
      <Pressable onPress={() => handleOpenBook(item)}>
        <List.Item
          title={item.title}
          description={item.subtitle}
          left={() => (
            <Avatar.Image source={{uri: item.imageLinks.smallThumbnail}} />
          )}
          right={() => <BookMenu book={item} />}
        />
      </Pressable>
    );
  };

  return (
    <>
      <List.Section>
        <FlatList
          data={books}
          keyExtractor={book => book._id.toString()}
          renderItem={RenderBookRows}
        />
      </List.Section>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Add Book')}
      />
      {openBook ? (
        <Dialog visible={isBookOpen} onDismiss={handleCloseBook}>
          <Dialog.Content>
            <BookCard bookInfo={openBook} />
            <Text>Qty: {openBook.qty}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button title="Done" onPress={handleCloseBook} />
          </Dialog.Actions>
        </Dialog>
      ) : (
        ''
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

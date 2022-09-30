/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Avatar, Paragraph, Divider, List, Text} from 'react-native-paper';
import {Book} from '../interfaces/books';

interface BookCardProps {
  bookInfo: Book;
}
interface AuthorListItemProps {
  item: string;
  index: number;
}

const BookCard = ({bookInfo}: BookCardProps) => {
  const publishedDate = new Date(bookInfo.publishedDate);

  return (
    <Card>
      <Card.Title
        title={bookInfo?.title}
        subtitle={bookInfo?.subtitle}
        left={() => (
          <Avatar.Image
            source={{uri: bookInfo?.imageLinks?.smallThumbnail}}
            size={55}
          />
        )}
      />
      <Divider />
      <Card.Content>
        <ScrollView style={styles.descriptionScroll}>
          <Paragraph>{bookInfo.description}</Paragraph>
        </ScrollView>
      </Card.Content>
      <Divider />
      <Card.Content>
        <List.Section>
          <List.Accordion
            title="Authors"
            left={props => <List.Icon {...props} icon="account" />}>
            <FlatList
              data={bookInfo.authors}
              renderItem={({item, index}: AuthorListItemProps) => (
                <List.Item key={index} title={item} />
              )}
            />
          </List.Accordion>
        </List.Section>
      </Card.Content>
      <Divider />
      <Card.Content style={styles.footer}>
        <Text>{`Pages: ${bookInfo.pageCount}`}</Text>
        <Text>{`Published: ${publishedDate.toLocaleDateString('en-us', {
          timeZone: 'America/New_York',
        })}`}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionScroll: {
    maxHeight: 300,
  },
});

export default BookCard;

import {Realm} from '@realm/react';
import {GoogleBook, ImageLink} from '../interfaces/books';

export class BookSchema extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  subtitle!: string;
  authors!: string[];
  publisher!: string;
  publishedDate!: Date;
  description!: string;
  pageCount!: number;
  categories!: string[];
  imageLinks!: ImageLink;
  language!: string;
  previewLink!: string;
  infoLink!: string;
  userId!: number;
  qty!: number;

  static generate(
    {
      title,
      subtitle,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks,
      language,
      previewLink,
      infoLink,
    }: GoogleBook,
    userId: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectID(),
      title,
      subtitle,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks,
      language,
      previewLink,
      infoLink,
      userId: parseInt(userId, 10),
      qty: 1,
    };
  }

  static schema = {
    name: 'Book',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      subtitle: 'string',
      authors: 'string[]',
      publisher: 'string',
      publishedDate: 'date',
      description: 'string',
      pageCount: 'int',
      categories: 'string[]',
      imageLinks: 'ImageLink',
      language: 'string',
      previewLink: 'string',
      infoLink: 'string',
      userId: 'int',
      qty: 'int',
    },
  };
}

export const ImageLinkSchema = {
  name: 'ImageLink',
  properties: {
    smallThumbnail: 'string',
    thumbnail: 'string',
  },
};

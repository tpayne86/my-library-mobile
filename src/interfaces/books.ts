import Realm from 'realm';
import {BookSchema} from '../db/bookSchema';

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}
export interface ReadingMode {
  text: string;
  image: boolean;
}

export interface ImageLink {
  smallThumbnail: string;
  thumbnail: string;
}

export interface GoogleBook {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  industryIdentifies: IndustryIdentifier[];
  readingModes: ReadingMode;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface RealmBook extends GoogleBook {
  _id?: Realm.BSON.ObjectId;
  userId?: string;
  qty?: number;
}

export type Book = RealmBook | (BookSchema & Realm.Object);

import { Request } from 'express';
import { User, UserDocument } from '../models/userModel';

export enum LeatherType {
  CRAZY_HORSE = 'Crazy Horse',
  NAPPA = 'Nappa',
  PULL_UP = 'Pull Up',
}

export enum ItemType {
  WALLETS = 'Wallets and cardholders',
  EYEGLASS_CASES = 'Eyeglass cases',
  PASSPORT_COVERS = 'Passport covers',
}

export enum Color {
  BLACK = 'black',
  BROWN = 'brown',
  BLUE = 'blue',
  GINGER = 'ginger',
  RED = 'red',
  BURGUNDY = 'burgundy',
  GREEN = 'green',
  GREY = 'grey',
  KHAKI = 'khaki',
}

export const itemTypes = [
  'Wallets and cardholders',
  'Eyeglass cases',
  'Passport covers',
];

export const colorValues = Object.values(Color);
export const leatherTypeValues = Object.values(LeatherType);

export interface RequestWithUser<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: UserDocument;
}

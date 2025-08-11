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

export enum OrderStatus {
  AWAITING_PAYMENT = 'Awaiting payment',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

export const itemTypes = [
  'Wallets and cardholders',
  'Eyeglass cases',
  'Passport covers',
];

export const colorValues = Object.values(Color);
export const leatherTypeValues = Object.values(LeatherType);
export const orderStatuses = Object.values(OrderStatus);

export interface RequestWithUser extends Request {
  user: UserDocument;
}

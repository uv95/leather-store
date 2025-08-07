export interface Item {
  _id: string;
  name: string;
  slug: string;
  type: ItemType;
  description: string;
  price: string;
  imageCover: Image;
  images: Image[];
  createdAt: string;
}

export interface Image {
  url: string;
  public_id: string;
}

export interface ItemsSchema {
  items: Item[];
  item?: Item;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
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

export const HexColor = {
  [Color.BLACK]: '#000000',
  [Color.BROWN]: '#55391a',
  [Color.BLUE]: '#0846aa',
  [Color.GINGER]: '#aa6908',
  [Color.RED]: '#cb1212',
  [Color.BURGUNDY]: '#801030',
  [Color.GREEN]: '#1e8b0d',
  [Color.GREY]: '#909090',
  [Color.KHAKI]: '#474c21',
};

export enum LeatherType {
  CRAZY_HORSE = 'Crazy Horse',
  NAPPA = 'Nappa',
  PULL_UP = 'Pull Up',
}

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
  isLoading: boolean;
}

export enum ItemType {
  WALLETS = 'Wallets and cardholders',
  EYEGLASS_CASES = 'Eyeglass cases',
  PASSPORT_COVERS = 'Passport covers',
}

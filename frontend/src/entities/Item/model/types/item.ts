export interface Item {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  price: string;
  imageCover: Image;
  images: Image[] | [];
  createdAt: string;
}

interface Image {
  url: string;
  public_id: string;
}

export interface ItemsSchema {
  items: Item[];
  item?: Item;
  isLoading: boolean;
}

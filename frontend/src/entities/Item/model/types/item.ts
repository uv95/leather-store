export interface IItem {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  price: string;
  imageCover: IImage;
  images: IImage[] | [];
  createdAt: string;
}

interface IImage {
  url: string;
  public_id: string;
}

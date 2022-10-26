import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:5000/items/';

export interface ItemData {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  // price: number;
  price: string;
  imageCover: string;
  images: string[] | [];
  createdAt: string;
}

const addItem = async (itemData: FormData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, itemData, config);
  return res.data;
};

const getAllItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const getItem = async (slug: string) => {
  const res = await axios.get(API_URL + slug);
  console.log(res.data);
  return res.data;
};

const deleteItem = async (itemId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + itemId, config);
  return res.data;
};

const itemsService = {
  addItem,
  getAllItems,
  getItem,
  deleteItem,
};

export default itemsService;

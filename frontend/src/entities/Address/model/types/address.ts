export interface Address {
  _id: string;
  city: string;
  address: string;
  zipcode: string;
}

export interface AddressSchema {
  address?: Address;
  addresses: Address[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

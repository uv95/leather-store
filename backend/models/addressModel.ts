import { Types, model, Schema } from 'mongoose';

export interface Address {
  city: string;
  address: string;
  zipcode: string;
  userId: Types.ObjectId;
}

const addressSchema = new Schema<Address>({
  city: {
    type: String,
    required: [true, 'Please specify a city'],
  },
  address: {
    type: String,
    required: [true, 'Please provide the full address'],
  },
  zipcode: {
    type: String,
    required: [true, 'Please provide a postal code'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Address must belong to the user'],
  },
});

const Address = model('Address', addressSchema);

export default Address;

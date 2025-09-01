import { OptionalType } from 'src/utils/types';

export interface CreateAddressDto {
  city: string;
  address: string;
  zipcode: string;
}

export type UpdateAddressDto = OptionalType<CreateAddressDto>;

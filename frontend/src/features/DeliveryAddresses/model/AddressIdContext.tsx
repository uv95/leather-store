import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface AddressIdContextProps {
  addressId: string;
  setAddressId: (addressId: string) => void;
}

export const AddressIdContext = createContext<AddressIdContextProps>({
  addressId: '',
  setAddressId: () => {},
});

export const AddressIdProvider = ({ children }: { children: ReactNode }) => {
  const [addressId, setAddressId] = useState('');

  const values = useMemo(
    () => ({
      addressId,
      setAddressId,
    }),
    [addressId]
  );

  return (
    <AddressIdContext.Provider value={values}>
      {children}
    </AddressIdContext.Provider>
  );
};

export const useAddressIdContext = () => useContext(AddressIdContext);

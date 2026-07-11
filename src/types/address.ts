export interface Address {
  id: string;
  userId: string;

  fullName: string;
  phone: string;

  houseNo: string;
  street: string;
  landmark?: string;

  city: string;
  state: string;
  pincode: string;

  latitude?: number;
  longitude?: number;

  isDefault: boolean;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateAddressPayload {
  fullName: string;
  phone: string;
  houseNo: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface UpdateAddressPayload
  extends Partial<CreateAddressPayload> {
  isDefault?: boolean;
}

export interface AddressResponse {
  success: boolean;
  address?: Address;
  message?: string;
}

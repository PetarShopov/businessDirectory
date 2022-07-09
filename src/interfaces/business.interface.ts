import { IAddress } from ".";

export interface IBusiness {
    id: string;
    name: string;
    description: string;
    phone: string;
    image: string;
    email: string;
    address: IAddress;
}
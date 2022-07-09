import { AddressEntity } from ".";
import { IAddress, IBusiness } from "../interfaces";

export default class BusinessEntity implements IBusiness {
    id: string;
    name: string;
    description: string;
    phone: string;
    image: string;
    email: string;
    address: IAddress;
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.phone = data.phone;
        this.image = data.image;
        this.email = data.email;
        this.address = new AddressEntity(data.address || {});
    }
}
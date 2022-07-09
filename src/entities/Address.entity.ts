import { IAddress } from "../interfaces";

export default class AddressEntity implements IAddress {
    number: string;
    street: string;
    zip: string;
    city: string;
    country: string;
    constructor(data: any) {
        this.number = data.number;
        this.street = data.street;
        this.zip = data.zip;
        this.city = data.city;
        this.country = data.country;
    }
}
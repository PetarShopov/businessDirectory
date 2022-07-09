import { IBusiness } from ".";

export interface IBusinessService {
    getBusinesses: { (): Promise<IBusiness[]> },
}
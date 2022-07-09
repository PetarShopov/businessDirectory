import { BusinessEntity } from "../entities";
import { IBusiness, IBusinessService } from "../interfaces";
import DataService from "./DataService";

export default class BusinessService implements IBusinessService {
    private serviceEndpoint: string = 'https://feinterviewtask.azurewebsites.net/b/6231abada703bb67492d2b8f';

    public getBusinesses(): Promise<IBusiness[]> {
        return DataService.get(this.serviceEndpoint).then((response: any) => {
            return response?.data?.map((item: IBusiness) => new BusinessEntity(item)) || [];
        })
    }
}
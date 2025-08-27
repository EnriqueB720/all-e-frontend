import { OwnershipLog as OwnershipLogRequestedData } from "@generated"
import { Watch } from "@model";

export class OwnershipLog {

    public data: OwnershipLogRequestedData;
    constructor(data: OwnershipLogRequestedData){
        this.data = data;
    }

    get id(){
        return this.data?.id!;
    }

    get timestamp(){
        return this.data?.timestamp!;
    }

    get watch(){
        return new Watch(this.data?.watch!);
    }
}
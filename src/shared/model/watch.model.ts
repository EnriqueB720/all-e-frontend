import {Watch as WatchRequestedData } from "@generated";
import { User } from "@model";

export class Watch {

    public data: WatchRequestedData;
    constructor(data: WatchRequestedData){
        this.data = data;
    }

    get id(){
        return this.data?.id!;
    }

    get serialNum(){
        return this.data?.serialNum!;
    }

    get brand(){
        return this.data?.brand ?? null;
    }

    get model(){
        return this.data?.model ?? null;
    }

    get referenceNumber(){
        return this.data?.referenceNumber ?? null;
    }

    get yearOfProduction(){
        return this.data?.yearOfProduction ?? null;
    }

    get imageUrl(){
        return this.data?.imageUrl ?? null;
    }

    get metadataURI(){
        return this.data?.metadataURI!;
    }

    get certificateUrl(){
        return this.data?.certificateUrl!;
    }

    get user(){
        return new User(this.data?.user!);
    }
}

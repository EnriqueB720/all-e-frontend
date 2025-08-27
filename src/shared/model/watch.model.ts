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

    get metadataURI(){
        return this.data?.metadataURI!;
    }

    get user(){
        return new User(this.data?.user!);
    }
}
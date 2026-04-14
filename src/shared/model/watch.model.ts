import {Watch as WatchRequestedData, MintStatus } from "@generated";
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

    get certificateUrl(){
        return this.data?.certificateUrl!;
    }

    get tokenId(){
        return this.data?.tokenId;
    }

    get txHash(){
        return this.data?.txHash;
    }

    get mintStatus(){
        return this.data?.mintStatus ?? MintStatus.Pending;
    }

    get basescanTxUrl(){
        return this.data?.basescanTxUrl;
    }

    get user(){
        return new User(this.data?.user!);
    }
}

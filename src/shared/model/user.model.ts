import { User as UserRequestData, Watch as WatchRequestedData } from "@generated"
import { Watch } from "@model";

export class User {

    public data: UserRequestData;
    public userWatches: WatchRequestedData[];
    constructor(data: UserRequestData){
        this.data = data;
        this.userWatches = data.watch!;
    }

    get id(){
        return this.data?.id!;
    }

    get username(){
        return this.data?.username!;
    }

    get email(){
        return this.data?.email!;
    }

    get watches(){
        return this.userWatches?.map(watch => new Watch(watch));
    }

    set contacts(watches: Watch[] | undefined){
       this.userWatches = watches!.map(watches => watches.data);
    }
}
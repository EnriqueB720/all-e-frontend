
import { SignUpInput } from "../generated/graphql-schema";

export class SignUpUser{
  
  public data!: SignUpInput;

  constructor(data: SignUpInput){
    this.data = data;
  }

}
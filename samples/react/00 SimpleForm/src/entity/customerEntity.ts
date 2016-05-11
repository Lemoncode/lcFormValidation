export class CustomerEntity {
   id : number;
   fullname : string;
   password : string;

   public constructor(){
     this.id = -1;
     this.fullname = '';
     this.password = '';
   }
}

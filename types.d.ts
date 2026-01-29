import { Connection } from "mongoose";

declare global{
    // var mongoose={
    //   // equal karne per type number ho jata hai
    var mongoose:{
        conn:Connection | null,  //start me connection nhi hai to null kar do
        promise:Promise<Connection> | null
    }
}

export {}
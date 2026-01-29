import { DefaultSession } from "next-auth"

//declare  next-auth  module inside install next-auth package.
declare module "next-auth"{
    interface Session{
      user:{
        id:string,
        // name:string | null | undefined,
        // email:string|null | undefined,
        // image:string
      } & DefaultSession['user']
    }
}
export {}
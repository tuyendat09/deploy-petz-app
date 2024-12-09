import { User as CustomUser } from "./User";

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

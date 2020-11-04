export class UserClass {
  name!: string;
  /**
   * @format email
   */
  email!: string;
}

export interface LaptopInterface {
  id: number;
}

export interface Ref extends LaptopInterface {
  user: UserClass;
}

interface Address{
        street?: string;
        suite?: string;
        city:string;
        zipcode?: string;
        geo?: {
        lat: string;
        lng: string;
        }
}

export interface IUser {
    id?: string;
    name: string;
    username: string;
    email: string;
    city: string;
}

export interface IUserResponse {
    id?: string;
    name: string;
    username: string;
    email: string;
    address:Address;
    company:any

}



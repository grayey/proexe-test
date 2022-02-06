import { IUser } from '../interfaces/userInterface';
import ApiHandlerService from './apiHandlerService';

class UserService extends ApiHandlerService {
    private entityUrl = 'data';

    /**
     * This method returns a list of users
     * @returns promise
     */
    public getAllUsers = async (): Promise<any> => this.get(this.entityUrl);

      /**
     * This method retrieves a user by their ID
     * @returns promise
     */
       public getUserById = async (id:string): Promise<any> => this.get(this.entityUrl, id);

    /**
     * This method creates a new user
     * @returns promise
     */
    public createUser = async (user: IUser): Promise<any> => this.post(this.entityUrl, user);

      /**
     * This method updates an existing user
     * @returns promise
     */
       public updateUser = async (user: IUser): Promise<any> => this.put(`${this.entityUrl}/${user.id}`, user);

    /**
     * This method deletes a user
     * @returns promise
     */
    public deleteUser = async (user: IUser): Promise<any> => this.del(`${this.entityUrl}/${user.id}`);
}

export default new UserService();

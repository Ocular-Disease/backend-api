import { Repository, getRepository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { User } from "../model/user";

class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = PostgresDataSource.getRepository(User);
    }

    public async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async getById(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    public async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }


}

export default new UserService();
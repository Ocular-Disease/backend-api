import { Repository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { Admin } from "../model/admin";
import { User } from "../model/user";

class AdminService {
    private adminRepository: Repository<Admin>;

    constructor() {
        this.adminRepository = PostgresDataSource.getRepository(Admin);
    }

    public async getAll(): Promise<User[]> {
        return this.adminRepository.find();
    }

    public async getById(id: string): Promise<User | null> {
        return this.adminRepository.findOneBy({ id });
    }

    public async create(user: User): Promise<User> {
        return this.adminRepository.save(user);
    }


}

export default new AdminService();
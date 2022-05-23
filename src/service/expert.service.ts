import { Repository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { Expert } from "../model/expert";


class ExpertService {
    private expertRepository: Repository<Expert>;

    constructor() {
        this.expertRepository = PostgresDataSource.getRepository(Expert);
    }

    public async getAllExperts(): Promise<Expert[]> {
        return await this.expertRepository.find();
    }

    public async getExpertById(id: string): Promise<Expert | null> {
        return await this.expertRepository.findOneBy({ id });
    }

    public async createExpert(expert: Expert): Promise<Expert> {
        return await this.expertRepository.save(expert);
    }

    public async updateExpert(id: string, expert: Expert): Promise<Expert> {
        return await this.expertRepository.save({ ...expert, id });
    }

    public async deleteExpert(id: string): Promise<void> {
        await this.expertRepository.delete(id);
    }

    public async getExpertByEmail(email: string): Promise<Expert | null> {
        return await this.expertRepository.findOne({ where: { email } });
    }
}

export default new ExpertService();
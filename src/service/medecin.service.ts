import { Repository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { Medecin } from "../model/medecin";

class MedecinService {
    private medecinRepository: Repository<Medecin>;

    constructor() {
        this.medecinRepository = PostgresDataSource.getRepository(Medecin);
    }

    public async getAll(): Promise<Medecin[]> {
        return this.medecinRepository.find();
    }

    public async getById(id: string): Promise<Medecin | null> {
        return this.medecinRepository.findOneBy({ id });
    }

    public async create(medecin: Medecin): Promise<Medecin> {
        return this.medecinRepository.save(medecin);
    }

    public async delete(id: string): Promise<void> {
        await this.medecinRepository.delete(id);
    }

    public async update(id: string, medecin: Medecin): Promise<Medecin> {
        return this.medecinRepository.save({ ...medecin, id });
    }
}

export default new MedecinService();
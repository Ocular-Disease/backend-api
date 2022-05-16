import { Repository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { Stade } from "../model/stade";


export class StadeService {
    private stadeRepository: Repository<Stade>;

    constructor() {
        this.stadeRepository = PostgresDataSource.getRepository(Stade);
    }

    public async getByMaladie(maladieId: string): Promise<Stade[]> {
        return this.stadeRepository.
            createQueryBuilder("stade")
            .leftJoinAndSelect("stade.maladie", "maladie")
            .leftJoinAndSelect("stade.imagesClassifies", "images", "images.stade = stade.id")
            .where("maladie.id = :maladieId", { maladieId })
            .getMany();
    }

    public async getAll(): Promise<Stade[]> {
        return this.stadeRepository.find();
    }

    public async create(stade: Stade): Promise<Stade> {
        return this.stadeRepository.save(stade);
    }

    public async delete(stade: Stade): Promise<void> {
        await this.stadeRepository.remove(stade);
    }

    public async getById(id: string): Promise<Stade | null> {
        return this.stadeRepository.findOne({ where: { id } });
    }

    public async getByNom(nom: string): Promise<Stade | null> {
        return this.stadeRepository.findOne({ where: { nom } });
    }

    public async getStadeWithImages(id: string): Promise<Stade | null> {
        return this.stadeRepository.createQueryBuilder("stade")
            .leftJoinAndSelect("stade.imagesClassifies", "images", "images.stade = stade.id")
            .where("stade.id = :id", { id })
            .getOne();
    }

    public async getAllStadeWithImages(): Promise<Stade[]> {
        return this.stadeRepository.createQueryBuilder("stade")
            .leftJoinAndSelect("stade.imagesClassifies", "images", "images.stade = stade.id")
            .getMany();
    }

    public async update(id: string, stade: Stade): Promise<Stade> {
		return this.stadeRepository.save({ ...stade, id });
	}

}

export default new StadeService();
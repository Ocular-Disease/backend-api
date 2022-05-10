import { Repository } from 'typeorm';
import { PostgresDataSource } from '../config/datasource.config';
import { Maladie } from '../model/maladie';

class MaladieService {
	private maladieRepository: Repository<Maladie>;

	constructor() {
		this.maladieRepository = PostgresDataSource.getRepository(Maladie);
	}

	public async getAll(): Promise<Maladie[]> {
		return this.maladieRepository.find();
	}

	public async getById(id: string): Promise<Maladie | null> {
		return this.maladieRepository.findOneBy({ id });
	}

	public async create(Maladie: Maladie): Promise<Maladie> {
		return this.maladieRepository.save(Maladie);
	}

	public async delete(id: string): Promise<void> {
		await this.maladieRepository.delete(id);
	}

	public async update(id: string, Maladie: Maladie): Promise<Maladie> {
		return this.maladieRepository.save({ ...Maladie, id });
	}
}

export default new MaladieService();

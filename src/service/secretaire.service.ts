import { Repository } from 'typeorm';
import { PostgresDataSource } from '../config/datasource.config';
import { Secretaire } from '../model/secretaire';

class SecretaireService {
	private secretaireRepository: Repository<Secretaire>;

	constructor() {
		this.secretaireRepository = PostgresDataSource.getRepository(Secretaire);
	}

	public async getAll(): Promise<Secretaire[]> {
		return this.secretaireRepository.find();
	}

	public async getById(id: string): Promise<Secretaire | null> {
		return this.secretaireRepository.findOneBy({ id });
	}

	public async create(secretaire: Secretaire): Promise<Secretaire> {
		return this.secretaireRepository.save(secretaire);
	}

	public async delete(id: string): Promise<void> {
		await this.secretaireRepository.delete(id);
	}

	public async update(id: string, secretaire: Secretaire): Promise<Secretaire> {
		return this.secretaireRepository.save({ ...secretaire, id });
	}

	public async getByEmail(email: string): Promise<Secretaire | null> {
		return this.secretaireRepository.findOneBy({ email });
	}
}

export default new SecretaireService();

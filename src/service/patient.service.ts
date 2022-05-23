import { Repository } from 'typeorm';
import { PostgresDataSource } from '../config/datasource.config';
import { Patient } from '../model/patient';

class PatientService {
	private patientRepository: Repository<Patient>;

	constructor() {
		this.patientRepository = PostgresDataSource.getRepository(Patient);
	}

	public async getAll(): Promise<Patient[]> {
		return this.patientRepository.find();
	}

	public async getById(id: string): Promise<Patient | null> {
		return this.patientRepository.findOneBy({ id });
	}

	public async create(Patient: Patient): Promise<Patient> {
		return this.patientRepository.save(Patient);
	}

	public async delete(id: string): Promise<void> {
		await this.patientRepository.delete(id);
	}

	public async update(id: string, Patient: Patient): Promise<Patient> {
		return this.patientRepository.save({ ...Patient, id });
	}

	
}

export default new PatientService();

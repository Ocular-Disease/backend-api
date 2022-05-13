import { Response, Request, NextFunction } from 'express';
import secretaireService from '../service/secretaire.service';

class SecretaireController {
	public async getAll(req: Request, res: Response) {
		res.status(200).json(await secretaireService.getAll());
	}

	public async getById(req: Request, res: Response) {
		const secretaireId = req.params.id;

		res.status(200).json(await secretaireService.getById(secretaireId));
	}

	public async create(req: Request, res: Response) {
		const secretaire = req.body;

		res.status(200).json(await secretaireService.create(secretaire));
	}

	public async delete(req: Request, res: Response) {
		const secretaireId = req.params.id;

		await secretaireService.delete(secretaireId);

		res.status(200).json();
	}

	public async update(req: Request, res: Response) {
		const secretaireId = req.params.id;
		const secretaire = req.body;

		res.status(200).json(await secretaireService.update(secretaireId, secretaire));
	}
}

export default new SecretaireController();

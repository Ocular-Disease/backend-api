import { Response, Request, NextFunction } from "express";
import medecinService from '../service/medecin.service';

class MedecinController {


    public async getAll(req: Request, res: Response) {
        res.status(200).json(await medecinService.getAll());
    }

    public async getById(req: Request, res: Response) {
        const medecinId = req.params.id;

        res.status(200).json(await medecinService.getById(medecinId));
    }

    public async create(req: Request, res: Response) {
        const medecin = req.body;

        res.status(200).json(await medecinService.create(medecin));
    }

    public async delete(req: Request, res: Response) {
        const medecinId = req.params.id;

        await medecinService.delete(medecinId);

        res.status(200).json();
    }

    public async update(req: Request, res: Response) {
        const medecinId = req.params.id;
        const medecin = req.body;

        res.status(200).json(await medecinService.update(medecinId, medecin));
    }
}

export default new MedecinController();
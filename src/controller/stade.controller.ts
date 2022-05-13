import {Request, Response} from 'express';
import { BadRequestException } from '../error/BadRequestException.error';
import { Stade } from '../model/stade';
import maladieService from '../service/maladie.service';
import stadeService from '../service/stade.service';

export class StadeController {
    public async getStadeByMaladie(req: Request, res: Response): Promise<Response> {
        const maladieId = req.params.maladieId;
        const stades = await stadeService.getByMaladie(maladieId);
        return res.status(200).json(stades);
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        const stades = await stadeService.getAll();
        return res.status(200).json(stades);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const {nom, description, maladieId} = req.body;


        const maladie = await maladieService.getById(maladieId);

        if (!maladie) {
            throw new BadRequestException('Maladie not found');
        }

        /**
         * Check if stade already exists
         */

        const exists = await stadeService.getByNom(nom.toLowerCase());

        if (exists) {
            throw new BadRequestException('Stade already exists');
        }

        const stade = new Stade();

        stade.nom = nom.toLowerCase();
        stade.description = description;
        stade.maladie = maladie;

        const stadeCreated = await stadeService.create(stade);
        return res.status(201).json(stadeCreated);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const stade = await stadeService.getById(id);
        if (!stade) {
            throw new BadRequestException('Stade not found');
        }
        await stadeService.delete(stade);
        return res.status(200).json({message: 'OK'});

    }

}

export default new StadeController();
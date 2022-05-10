import {Request, Response} from 'express';
import { Maladie } from '../model/maladie';
import maladieService from '../service/maladie.service';

export class MaladieController {
    constructor() { }


    public async create(req: Request, res: Response) {
        const { nom, description } = req.body;

        const maladie = new Maladie();

        maladie.nom = nom;
        maladie.description = description;

        await maladieService.create(maladie);

        console.log("maladie created");

        res.status(201).json({
            message: "maladie created"
        });
    }

    public async getAll(req: Request, res: Response) {
        const maladies = await maladieService.getAll();
        
        res.status(200).json({
            message: "maladies found",
            maladies
        });

        console.log("maladies found");

    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        
        const maladie = await maladieService.getById(id);

        res.status(200).json({
            message: "maladie found",
            maladie
        });
    }

}

export default new MaladieController();
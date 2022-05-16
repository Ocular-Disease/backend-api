import { Request, Response } from 'express';
import { Maladie } from '../model/maladie';
import maladieService from '../service/maladie.service';

export class MaladieController {
    constructor() { }


    public async create(req: Request, res: Response) {
        const { nom, description } = req.body;

        const exists = await maladieService.getByNom(nom);

        if (exists) {
            throw new Error("maladie already exists");
        }

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

    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        await maladieService.delete(id);

        res.status(200).json({
            message: "maladie deleted"
        });
    }

    public async update(req: Request, res: Response) {
        const maladieId = req.params.id;
        const maladie = req.body;
    
        res.status(200).json(await maladieService.update(maladieId, maladie));
    }

}

export default new MaladieController();
import { Request, Response } from 'express';
import { BadRequestException } from '../error/BadRequestException.error';
import { ImageClassifie } from '../model/ImageClassifie';
import imageService from '../service/image.service';
import stadeService from '../service/stade.service';

class ImageController {
    public async addImage(req: Request, res: Response) {
        const { urls, stadeId } = req.body as { urls: string[], stadeId: string };


        const stade = await stadeService.getById(stadeId);

        if (!stade) {
            throw new BadRequestException('Stade not found');
        }

        const images = await imageService.getByStade(stadeId);

        for (const url of urls) {
            const image = new ImageClassifie();
            image.url = url;
            image.stade = stade;
            image.nom = url.split('/').pop() as string;
            images.push(image);
        }

        await imageService.createMany(images);

        return res.status(201).json(images);
    }

    public async getImagesByStade(req: Request, res: Response) {
        const { stadeId } = req.params;
        const images = await imageService.getByStade(stadeId);
        return res.status(200).json(images);
    }

    public async getPreview(req: Request, res: Response) {
        const { stadeId } = req.params;
        const images = await imageService.getPreview(stadeId);
        return res.status(200).json(images);
    }

    public async deleteImage(req: Request, res: Response) {
        const { id } = req.params;
        const image = await imageService.getById(id);
        if (!image) {
            throw new BadRequestException('Image not found');
        }
        await imageService.delete(image);
        return res.status(200).json(image);

    }
    public async update(req: Request, res: Response) {
        const imageId = req.params.id;
        const image = req.body;

        res.status(200).json(await imageService.update(imageId, image));
    }
}

export default new ImageController();
import { Request, Response } from 'express';
import { BadRequestException } from '../error/BadRequestException.error';
import { ImageClassifie } from '../model/ImageClassifie';
import imageService from '../service/image.service';
import stadeService from '../service/stade.service';

class ImageController {
    public async addImage(req: Request, res: Response) {
        const { stadeId } = req.params;
        const { urls } = req.body as { urls: string[] };


        const stade = await stadeService.getById(stadeId);

        if (!stade) {
            throw new BadRequestException('Stade not found');
        }

        const images = await imageService.getByStade(stadeId);

        for (const url of urls) {
            const image = new ImageClassifie();
            image.url = url;
            image.stade = stade;
            images.push(image);
        }

        await imageService.createMany(images);

        return res.status(201).json(images);
    }
}

export default new ImageController();
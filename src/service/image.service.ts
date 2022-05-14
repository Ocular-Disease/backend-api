import { Repository } from "typeorm";
import { PostgresDataSource } from "../config/datasource.config";
import { ImageClassifie } from "../model/ImageClassifie";

class ImageService {
    private imageRepository: Repository<ImageClassifie>;

    constructor() {
        this.imageRepository = PostgresDataSource.getRepository(ImageClassifie);
    }

    public async getAll(): Promise<ImageClassifie[]> {
        return this.imageRepository.find();
    }

    public async getPreview(): Promise<ImageClassifie[]> {
        return this.imageRepository.find({
            select: ["id", "url", "stade"],
            take: 4,
            order: {
                id: "DESC"
            }
        });
    }

    public async getById(id: string): Promise<ImageClassifie | null> {
        return this.imageRepository.findOne({ where: { id } });
    }

    public async getByStade(stadeId: string): Promise<ImageClassifie[]> {
        return this.imageRepository.find({
            where: {
                stade: {
                    id: stadeId
                }
            }
        });
    }

    public async create(image: ImageClassifie): Promise<ImageClassifie> {
        return this.imageRepository.save(image);
    }

    public async delete(image: ImageClassifie): Promise<void> {
        await this.imageRepository.remove(image);
    }

    public async createMany(images: ImageClassifie[]): Promise<ImageClassifie[]> {
        return this.imageRepository.save(images);
    }
}

export default new ImageService();
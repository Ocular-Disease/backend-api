import {Repository} from "typeorm";
import {Token} from "../model/token";
import {PostgresDataSource} from "../config/datasource.config";
import {User} from "../model/user";
import jwtService from '../service/jwt.service';
import {Admin} from "../model/admin";
import {Medecin} from "../model/medecin";
import {Secretaire} from "../model/secretaire";
import {instanceToPlain} from "class-transformer";

class TokenService {
    private readonly tokenRepository: Repository<Token>;
    private readonly userRepository: Repository<User>;

    constructor() {
        this.tokenRepository = PostgresDataSource.getRepository(Token);
        this.userRepository = PostgresDataSource.getRepository(User);
    }

    public async createToken(user: User, jwt: string): Promise<Token> {
        const token = new Token();
        token.refreshToken = jwt;
        token.user = user.id;
        return await this.tokenRepository.save(token);
    }

    public async getToken(token: string): Promise<Token | null> {
        return await this.tokenRepository.findOne({where: {refreshToken: token}});
    }

    public async deleteToken(token: Token): Promise<void> {
        await this.tokenRepository.remove(token);
    }

    public async getTokensByUser(user: User | null): Promise<Token[]> {

        if (user instanceof Admin) {
            return this.tokenRepository.createQueryBuilder("token")
                .leftJoinAndMapOne("token.user", Admin, "user", "token.user = :userId", {userId: user.id})
                .getMany();
        }

        if (user instanceof Medecin) {
            return this.tokenRepository.createQueryBuilder("token")
                .leftJoinAndMapOne("token.user", Medecin, "user", "token.user = :userId", {userId: user.id})
                .getMany();
        }

        if (user instanceof Secretaire) {
            return this.tokenRepository.createQueryBuilder("token")
                .leftJoinAndMapOne("token.user", Secretaire, "user", "token.user = :userId", {userId: user.id})
                .getMany();
        }

        return [];

    }

}

export default new TokenService();
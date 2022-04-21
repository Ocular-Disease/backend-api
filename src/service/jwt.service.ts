import jwt, { SignOptions } from 'jsonwebtoken';
import { IPayload } from '../types/jwtpayload.interface';

class JwtService {
    constructor(private readonly options?: SignOptions) { }

    public sign(payload: IPayload): string {
        return jwt.sign(payload, process.env.JWT_SECRET!, this.options);
    }

    public verify(token: string): IPayload {
        return jwt.verify(token, process.env.JWT_SECRET!, this.options) as IPayload;
    }
}

export default new JwtService({
    expiresIn: '1d',
});
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvVariable } from "../contants";
import { BadRequestException, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";

//jwt strategy for authenticating the request.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>(EnvVariable.JWT_PUBLIC_SECRET),
          });
    }

    async validate(@Req() req: any){
        console.log("yaha aaya")
        const { id, name, mobile, exp } = req;
        console.log(id)
        try {
            if (Date.now() > exp * 1000) throw new UnauthorizedException('Token Expired');
            const userDetails = await this.usersService.getUserByMobile(mobile);
            if (userDetails?.id !== id) throw new UnauthorizedException('unauthorized');
            if (!(id && mobile)) throw new BadRequestException('provide correct creds');
            return req;
        } catch (error) {
            //here we can write the logic for refresh token stored in redis.
            throw error;
        }
    }
}
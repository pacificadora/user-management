import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC } from "../contants/constants";

//created auth guard for authenticating if the route is public or not by using IsPublic decorator.
@Injectable()
export class JWTAuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic = this.reflector.get<boolean>(IS_PUBLIC, context.getHandler());
      if (isPublic) return true;
      return super.canActivate(context);
    }
}
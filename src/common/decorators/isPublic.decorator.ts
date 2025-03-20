import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '../contants/constants';

//created isPublic decorator to check if the route is public(open) or not.
export const IsPublic = (): CustomDecorator<typeof IS_PUBLIC> => {
  return SetMetadata(IS_PUBLIC, true);
};
import {ObjectType} from 'typeorm';
import {UseGuards} from '@nestjs/common';
import {OwnedByUserGuard} from './owned-by-user.guard';

export const UseOwnedByUserGuard = <T>(type: ObjectType<T>) => UseGuards(new OwnedByUserGuard(type));

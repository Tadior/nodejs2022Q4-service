import { UserResponse } from 'src/types/apiTypes';
import { UserEntity } from '../entity/user.entity';

export const makeUserResponse = (user: UserEntity): UserResponse => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
};

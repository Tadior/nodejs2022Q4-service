import { User, UserResponse } from 'src/types/apiTypes';

export const makeUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

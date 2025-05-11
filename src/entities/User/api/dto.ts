import type { AuthenticationResponse } from '@/shared/api';

import type { UserModel } from '../types';

export type UserResponseDTO = UserModel;

export type UpdateUserRequestDTO = Pick<
    UserModel,
    'email' | 'name' | 'avatarPath' | 'about' | 'phone' | 'roles' | 'password'
>;

export type RegisterFormResponseDTO = AuthenticationResponse;

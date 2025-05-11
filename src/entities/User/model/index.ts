import { store } from '@davstack/store';

import { STORAGE } from '@/shared/lib/services';

import type { UserModel } from '../types';

interface UserModelState {
    user: UserModel | null;
    isAuthorized: boolean;
}

export const useUserModel = store<UserModelState>({
    user: null,
    isAuthorized: Boolean(STORAGE.getJSON('accessToken')?.length),
});

import { createInternalRequestFx } from '@/shared/api';

import type { UserResponseDTO } from '../api/dto.ts';

export const getUserByIdQuery = createInternalRequestFx<string, UserResponseDTO>((id) => ({
    url: `/users/${id}`,
}));

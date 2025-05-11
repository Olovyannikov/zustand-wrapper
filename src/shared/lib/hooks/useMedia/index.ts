import { useMediaQuery } from 'usehooks-ts';

export const useIsLarge = () => useMediaQuery('(min-width: 768px)');

import { notifications } from '@mantine/notifications';

export const redirectToSignInPageFx = (statusCode: number) => {
    if (statusCode === 401) {
        notifications.show({
            title: 'Ошибка',
            message: 'Вы не авторизованы',
        });
        return (window.location.pathname = '/sign-in');
    }

    return (window.location.pathname = '/error-404');
};

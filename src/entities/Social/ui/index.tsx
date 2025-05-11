import { Anchor, List, ListItem } from '@mantine/core';
import {
    IconBrandInstagram,
    IconBrandSlack,
    IconBrandTelegram,
    IconBrandVk,
    IconBrandWhatsapp,
} from '@tabler/icons-react';

import s from './Socials.module.css';

const SOCIAL_NETWORK_LIST = [
    { id: 0, path: 'https://web.telegram.org/z/', name: 'Telegram', icon: <IconBrandTelegram /> },
    {
        id: 1,
        name: 'Whatsapp',
        path: 'https://web.whatsapp.com/',
        icon: <IconBrandWhatsapp />,
    },
    {
        id: 2,
        name: 'Slack',
        path: 'https://slack.com/workspace-signin',
        icon: <IconBrandSlack />,
    },
    {
        id: 3,
        name: 'Instagram',
        path: 'https://instagram.com/',
        icon: <IconBrandInstagram />,
    },
    {
        id: 4,
        name: 'VK',
        path: 'http://vk.com/',
        icon: <IconBrandVk />,
    },
];

export const Socials = () => (
    <List className={s.socials}>
        {SOCIAL_NETWORK_LIST.map((item) => (
            <ListItem key={item.id}>
                <Anchor c='black' href={item.path}>
                    {item.icon}
                </Anchor>
            </ListItem>
        ))}
    </List>
);

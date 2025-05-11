import { Link } from 'react-router';
import { Button, type ButtonProps } from '@mantine/core';

export const ReturnToHomePage = ({ children, ...props }: ButtonProps) => (
    <Button component={Link} to='/' c='black' bg='yellow.4' {...props}>
        {children}
    </Button>
);

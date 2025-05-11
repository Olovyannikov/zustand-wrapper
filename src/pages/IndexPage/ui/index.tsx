import { Container } from '@mantine/core';

import { Products } from '@/widgets/Products';
import { RootLayout } from '@/widgets/RootLayout';

export default function IndexPage() {
    return (
        <RootLayout>
            <Container>
                <Products />
            </Container>
        </RootLayout>
    );
}

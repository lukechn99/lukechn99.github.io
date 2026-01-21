import { Box, Center } from '@mantine/core';
import AppLayout from './AppLayout.tsx';

function Work() {
    return AppLayout(<Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
      <Box bg="var(--mantine-color-blue-light)">All elements inside Center are centered</Box>
    </Center>)
}

export default Work;
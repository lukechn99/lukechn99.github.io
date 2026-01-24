import './App.css'
import { Button, Group, Box, Center, Stack, Title } from '@mantine/core';
import { useState } from 'react';
import { FloatingIndicator } from '@mantine/core';

const data = ['Maps', 'Vue', 'Angular', 'Svelte'];

function Works() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <Button
      key={item}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
      variant="default"
    >
      {item}
    </Button>
  ))

  return (
    <Center maw="80vw">
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="xs"
      >
        <Title order={2}>My Works</Title>
        <Box pos="relative">
          <Group ref={setRootRef} justify="center" pos="relative">
            {controls}

            <FloatingIndicator
              target={controlsRefs[active]}
              parent={rootRef}
              style={{
                backgroundColor: 'var(--mantine-primary-color-filled)',
                borderRadius: 'var(--mantine-radius-default)',
                opacity: 0.5,
              }}
            />
          </Group>
        </Box>
      </Stack>
    </Center>
  )
}

export default Works

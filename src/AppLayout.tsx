import { AppShell, 
  Burger, 
  Stack, 
  Button, 
  ActionIcon, 
  ThemeIcon, 
  Space 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconCode, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

function AppLayout(mainContent: React.ReactNode) {
    const [opened, { toggle }] = useDisclosure()

    const NavBarStack = <Stack
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="xs"
      >
        <Space h="sm" />
        <ActionIcon 
          component={Link} 
          to="/works" 
          variant="filled"
          size="xl" 
          aria-label="Works" 
        >
          <ThemeIcon radius="md" size="xl">
            <IconCode style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>
        <ActionIcon variant="filled" size="xl" aria-label="GitHub" component="a" href="https://github.com/lukechn99" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="md" size="xl">
            <IconBrandGithub style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>
        <ActionIcon variant="filled" size="xl" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/chen-luke" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="md" size="xl">
            <IconBrandLinkedin style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>
        <Space h="sm" />
      </Stack>

    return <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 60,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      {/* <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div>Logo</div>
      </AppShell.Header> */}

      <AppShell.Navbar>
        {NavBarStack}
      </AppShell.Navbar>

      <AppShell.Main>
        {mainContent}
      </AppShell.Main>
    </AppShell>
}

export default AppLayout;
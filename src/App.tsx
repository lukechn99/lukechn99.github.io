import { Center, Stack, ActionIcon, Space, ThemeIcon, Title, Box } from '@mantine/core'
import './App.css'
import { IconCode, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import PushingHoverIcon from './components/PushingHoverIcon.tsx'

function App() {
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const messages = [
    "Hello, I'm Luke Chen.",
    "Welcome to my portfolio website.",
    "Feel free to explore my works and projects.",
    "Connect with me on GitHub and LinkedIn.",
    "Enjoy your stay!"
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [carouselRunning, setCarouselRunning] = useState(true)

  const toggleCarousel = () => {
    setCarouselRunning(!carouselRunning)
    setCurrentMessageIndex(0)
  }

  useEffect(() => {
    const showNextMessage = async () => {
      await sleep(5000)
      setCurrentMessageIndex(prev => (prev + 1) % messages.length)
    }

    showNextMessage()
  }, [currentMessageIndex, messages.length])

  return <Center maw="80vw">
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="flex-start"
      gap="xs"
    >
      <Box onClick={toggleCarousel} style={{ cursor: 'pointer' }}>
        <Title order={1}>
          {carouselRunning ? messages[currentMessageIndex] : messages.join(' ')}
        </Title>
      </Box>
      <Space h="md" />
      {PushingHoverIcon(
        <ActionIcon component={Link} to="/works" variant="filled" size="xl" aria-label="Works">
          <ThemeIcon radius="s" size="xl">
            <IconCode style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          Explore my projects and works here!
        </Box>
      )}
      {PushingHoverIcon(
        <ActionIcon variant="filled" size="xl" aria-label="GitHub" component="a" href="https://github.com/lukechn99" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="s" size="xl">
            <IconBrandGithub style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          Check out my GitHub
        </Box>
      )}
      {PushingHoverIcon(
        <ActionIcon variant="filled" size="xl" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/chen-luke" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="s" size="xl">
            <IconBrandLinkedin style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          Connect with me on LinkedIn
        </Box>
      )}
      <Space h="sm" />
    </Stack>
  </Center>
}

export default App

import { Center, Stack, ActionIcon, Space, ThemeIcon, Title, Box } from '@mantine/core'
import { IconCode, IconBrandGithub, IconBrandLinkedin, IconBrandGmail } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import PushingHoverIcon from './components/PushingHoverIcon.tsx'
import { useTranslation } from 'react-i18next'

function App() {
  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const { t } = useTranslation()
  const messages = t('home.messages', { returnObjects: true }) as string[]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [carouselRunning, setCarouselRunning] = useState(true)

  const toggleCarousel = () => {
    setCarouselRunning(!carouselRunning)
    setCurrentMessageIndex(0)
  }

  useEffect(() => {
    const showNextMessage = async () => {
      const sleepTime = (messages[currentMessageIndex]?.length || 0) * 100 + 2000
      await sleep(sleepTime)
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
        <ActionIcon component={Link} to="/works" variant="filled" size="xl" radius="xl" aria-label="Works">
          <ThemeIcon radius="lg" size="xl">
            <IconCode style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          {t('home.works')}
        </Box>
      )}
      {PushingHoverIcon(
        <ActionIcon variant="filled" size="xl" radius="xl" aria-label="GitHub" component="a" href="https://github.com/lukechn99" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="lg" size="xl">
            <IconBrandGithub style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          {t('home.github')}
        </Box>
      )}
      {PushingHoverIcon(
        <ActionIcon variant="filled" size="xl" radius="xl" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/chen-luke" target="_blank" rel="noopener noreferrer">
          <ThemeIcon radius="lg" size="xl">
            <IconBrandLinkedin style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          {t('home.linkedin')}
        </Box>
      )}
      {PushingHoverIcon(
        <ActionIcon component={Link} to="/contact" variant="filled" size="xl" radius="xl" aria-label="Works">
          <ThemeIcon radius="lg" size="xl">
            <IconBrandGmail style={{ width: '80%', height: '80%' }} />
          </ThemeIcon>
        </ActionIcon>,
        <Box p="xs">  
          {t('home.contact')}
        </Box>
      )}
      <Space h="sm" />
    </Stack>
  </Center>
}

export default App

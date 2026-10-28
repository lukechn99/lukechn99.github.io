import { Anchor, Box, Card, Group, Image, Stack, Text, Title } from "@mantine/core"
import classes from './GamesTab.module.css'
import { useTranslation } from 'react-i18next'

const BULWARK_URL = "https://lukechn99.github.io/bulwark/"
const BULWARK_SOURCE = "https://github.com/lukechn99/bulwark"

export default function GamesTab() {
    const gamesLink = "https://games-alpha-rouge.vercel.app/"
    const { t } = useTranslation()

    return <Stack align="center">
        <Card withBorder radius="md" padding="lg" className={classes.feature}>
            <Card.Section component="a" href={BULWARK_URL} target="_blank" rel="noopener noreferrer">
                <Image src={`${import.meta.env.BASE_URL}games/bulwark.jpg`} alt={t('games.bulwarkTitle')} className={classes.shot} />
            </Card.Section>
            <Stack gap="xs" mt="md">
                <Title order={3}>{t('games.bulwarkTitle')}</Title>
                <Text>{t('games.bulwarkBlurb')}</Text>
                <Text size="sm" c="dimmed">{t('games.bulwarkNote')}</Text>
                <Group gap="lg" justify="center">
                    <Anchor href={BULWARK_URL} target="_blank" rel="noopener noreferrer" fw={600}>{t('games.bulwarkPlay')}</Anchor>
                    <Anchor href={BULWARK_SOURCE} target="_blank" rel="noopener noreferrer">{t('games.bulwarkSource')}</Anchor>
                </Group>
            </Stack>
        </Card>

        {t('games.intro')}

        <iframe src={gamesLink} title="Vercel Games" className={classes.iframe}></iframe>
        <Box p="xs" aria-label="LinkedIn" component="a" href={gamesLink} target="_blank" rel="noopener noreferrer">  
            {t('games.visit')}
        </Box>
    </Stack>
}

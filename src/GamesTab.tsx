import { Anchor, Card, Group, Image, Stack, Text, Title } from "@mantine/core"
import classes from './GamesTab.module.css'
import { useTranslation } from 'react-i18next'

const BULWARK_URL = "https://lukechn99.github.io/bulwark/"
const BULWARK_SOURCE = "https://github.com/lukechn99/bulwark"
const GAME_NIGHT_URL = "https://lukechn99.github.io/games/"
const GAME_NIGHT_SOURCE = "https://github.com/lukechn99/games"

export default function GamesTab() {
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

        <Card withBorder radius="md" padding="lg" className={classes.feature}>
            <Card.Section component="a" href={GAME_NIGHT_URL} target="_blank" rel="noopener noreferrer">
                <Image src={`${import.meta.env.BASE_URL}games/game-night.jpg`} alt={t('games.gameNightTitle')} className={classes.shot} />
            </Card.Section>
            <Stack gap="xs" mt="md">
                <Title order={3}>{t('games.gameNightTitle')}</Title>
                <Text>{t('games.gameNightBlurb')}</Text>
                <Text size="sm" c="dimmed">{t('games.gameNightNote')}</Text>
                <Group gap="lg" justify="center">
                    <Anchor href={GAME_NIGHT_URL} target="_blank" rel="noopener noreferrer" fw={600}>{t('games.gameNightPlay')}</Anchor>
                    <Anchor href={GAME_NIGHT_SOURCE} target="_blank" rel="noopener noreferrer">{t('games.gameNightSource')}</Anchor>
                </Group>
            </Stack>
        </Card>
    </Stack>
}

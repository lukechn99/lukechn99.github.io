// Unlisted portfolio feature, retained for revival. See README: Games showcase.
import { Anchor, Card, Group, Image, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import classes from '../GamesTab.module.css'

const BULWARK_URL = 'https://lukechn99.github.io/bulwark/'
const BULWARK_SOURCE = 'https://github.com/lukechn99/bulwark'

export default function BulwarkCard() {
    const { t } = useTranslation()
    return (
        <Card withBorder radius="md" padding="lg" className={classes.feature}>
            <Card.Section component="a" href={BULWARK_URL} target="_blank" rel="noopener noreferrer">
                <Image src="/game-art/bulwark.jpg" alt={t('games.bulwarkTitle')} className={classes.shot} />
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
    )
}

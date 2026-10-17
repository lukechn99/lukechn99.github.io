import { Box, Stack } from "@mantine/core"
import classes from './GamesTab.module.css'
import { useTranslation } from 'react-i18next'

export default function GamesTab() {
    const gamesLink = "https://games-alpha-rouge.vercel.app/"
    const { t } = useTranslation()

    return <Stack align="center">
        {t('games.intro')}

        <iframe src={gamesLink} title="Vercel Games" className={classes.iframe}></iframe>
        <Box p="xs" aria-label="LinkedIn" component="a" href={gamesLink} target="_blank" rel="noopener noreferrer">  
            {t('games.visit')}
        </Box>
    </Stack>
}
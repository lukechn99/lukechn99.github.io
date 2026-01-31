import { Box, Stack } from "@mantine/core"
import classes from './GamesTab.module.css'

export default function GamesTab() {
    const gamesLink = "https://games-alpha-rouge.vercel.app/"

    return <Stack align="center">
        After I finish the WebRTC games I can showcase some learnings there too. This is still a work in progress.

        <iframe src={gamesLink} title="Vercel Games" className={classes.iframe}></iframe>
        <Box p="xs" aria-label="LinkedIn" component="a" href={gamesLink} target="_blank" rel="noopener noreferrer">  
            Visit the game site
        </Box>
    </Stack>
}
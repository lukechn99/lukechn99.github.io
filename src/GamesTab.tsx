import { Stack } from "@mantine/core"
import classes from './GamesTab.module.css'

export default function GamesTab() {
    return <Stack align="center">
        After I finish the WebRTC games I can showcase some learnings there too.
        <iframe src="https://games-alpha-rouge.vercel.app/" title="Vercel Games" className={classes.iframe}></iframe>
    </Stack>
}
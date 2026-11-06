import { useEffect } from 'react'
import { Anchor, Button, Group, Stack, Text, Title } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import en, { type Copy } from './copy/en.ts'
import es from './copy/es.ts'
import vi from './copy/vi.ts'
import zh from './copy/zh.ts'
import { GuardDiagram, HostAmbient, HostDiagram, ServerDiagram, StunDiagram, TopologyDiagram, TurnDiagram } from './diagrams.tsx'
import classes from './webrtc.module.css'

const COPY: Record<string, Copy> = { en, es, vi, zh }
const GAME_NIGHT_URL = 'https://lukechn99.github.io/games/'
const SOURCE_URL = 'https://github.com/lukechn99/games'

function Nerd({ title, body }: { title: string; body: string[] }) {
    return (
        <details className={classes.nerd}>
            <summary>{title}</summary>
            {body.map((p, i) => (
                <Text key={i} size="sm" mt="xs">{p}</Text>
            ))}
        </details>
    )
}

function Section({ id, title, body, children, nerd }: { id: string; title: string; body: string[]; children: ReactNode; nerd: { title: string; body: string[] } }) {
    return (
        <section className={classes.section} aria-labelledby={id}>
            <Title order={2} id={id} className={classes.h2}>{title}</Title>
            {body.map((p, i) => (
                <Text key={i} className={classes.p}>{p}</Text>
            ))}
            {children}
            <Nerd {...nerd} />
        </section>
    )
}

export default function WebRTCPage() {
    const { i18n } = useTranslation()
    const c = COPY[i18n.resolvedLanguage ?? 'en'] ?? en

    useEffect(() => {
        const before = document.title
        document.title = c.pageTitle
        window.scrollTo(0, 0)
        return () => {
            document.title = before
        }
    }, [c.pageTitle])

    return (
        <article className={classes.page}>
            <Anchor component={Link} to="/works/games" className={classes.back} size="sm">
                <IconChevronLeft size={16} /> {c.back}
            </Anchor>

            <header className={classes.hero}>
                <Title order={1} className={classes.h1}>{c.hero.title}</Title>
                <Text className={classes.lede}>{c.hero.lede}</Text>
                <Group gap="sm" mt="md">
                    <Button component="a" href={GAME_NIGHT_URL} target="_blank" rel="noopener noreferrer">{c.hero.play}</Button>
                    <Button component="a" href={SOURCE_URL} target="_blank" rel="noopener noreferrer" variant="default">{c.hero.source}</Button>
                </Group>
                <HostAmbient c={c} />
            </header>

            <Section id="wr-server" title={c.server.title} body={c.server.body} nerd={c.server.nerd}>
                <ServerDiagram c={c} />
            </Section>
            <Section id="wr-host" title={c.host.title} body={c.host.body} nerd={c.host.nerd}>
                <HostDiagram c={c} />
            </Section>
            <Section id="wr-topo" title={c.topo.title} body={c.topo.body} nerd={c.topo.nerd}>
                <TopologyDiagram c={c} />
            </Section>
            <Section id="wr-stun" title={c.stun.title} body={c.stun.body} nerd={c.stun.nerd}>
                <StunDiagram c={c} />
            </Section>
            <Section id="wr-turn" title={c.turn.title} body={c.turn.body} nerd={c.turn.nerd}>
                <TurnDiagram c={c} />
            </Section>
            <Section id="wr-guard" title={c.guard.title} body={c.guard.body} nerd={c.guard.nerd}>
                <GuardDiagram c={c} />
            </Section>

            <section className={classes.section} aria-labelledby="wr-why">
                <Title order={2} id="wr-why" className={classes.h2}>{c.why.title}</Title>
                <Stack gap="sm">
                    {c.why.points.map(([head, rest]) => (
                        <Text key={head} className={classes.p}><b>{head}</b> {rest}</Text>
                    ))}
                </Stack>
                <Title order={3} className={classes.h3}>{c.why.tradeoffs}</Title>
                <ul className={classes.list}>
                    {c.why.tradeoffList.map((t) => <li key={t}><Text>{t}</Text></li>)}
                </ul>
                <Text className={classes.p} mt="lg">{c.why.outro}</Text>
                <Group gap="sm" mt="sm">
                    <Button component="a" href={GAME_NIGHT_URL} target="_blank" rel="noopener noreferrer">{c.hero.play}</Button>
                    <Button component="a" href={SOURCE_URL} target="_blank" rel="noopener noreferrer" variant="default">{c.hero.source}</Button>
                </Group>
            </section>
        </article>
    )
}

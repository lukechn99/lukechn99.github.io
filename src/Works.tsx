import { Suspense, lazy, useState } from 'react'
import { ActionIcon, FloatingIndicator, Stack, Tabs } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './Works.module.css'
import GamesTab from './GamesTab.tsx';

const MapsTab = lazy(() => import('./MapsTab.tsx'))
const PeopleMapTab = lazy(() => import('./PeopleMapTab.tsx'))

// Maps will include map tiles, routing, scrubbing, jumping to locations, travel pins, flights, etc.
// Micro-frontends should showcase module federated widgets like a calculator, Sankey diagram maker, and others
// AWS could include architectures, learnings, best practices, etc.
// After I finish the WebRTC games I can showcase some learnings there too. 

/** Each tab has its own URL: /#/works/<slug>. */
const TAB_SLUGS = ['itinerary-builder', 'people-groups-map', 'micro-frontends', 'aws', 'games'] as const
type TabSlug = typeof TAB_SLUGS[number]

export default function Works() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const { tab } = useParams()
    const value = tab && TAB_SLUGS.includes(tab as TabSlug) ? tab : null
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node
        setControlsRefs(controlsRefs)
    }

    if (!value) return <Navigate to={`/works/${TAB_SLUGS[0]}`} replace />

    return (
        <>
        <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            onClick={() => navigate('/')}
            aria-label={t('nav.backHome')}
            style={{ position: 'fixed', top: 68, left: 16, zIndex: 1000 }}
        >
            <IconChevronLeft size={22} />
        </ActionIcon>
        <Stack
            align="stretch"
            w="80vw"
            mx="auto"
            style={{ overflow: 'hidden' }}
            gap="xs"
        >
            <Tabs variant="none" value={value} onChange={v => { if (v) navigate(`/works/${v}`) }} keepMounted={false}>
                <Tabs.List 
                    ref={setRootRef} 
                    className={classes.list}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Tabs.Tab value="itinerary-builder" ref={setControlRef('itinerary-builder')} className={classes.tab}>
                        {t('works.itinerary')}
                    </Tabs.Tab>
                    <Tabs.Tab value="people-groups-map" ref={setControlRef('people-groups-map')} className={classes.tab}>
                        {t('works.peopleMap')}
                    </Tabs.Tab>
                    <Tabs.Tab value="micro-frontends" ref={setControlRef('micro-frontends')} className={classes.tab}>
                        {t('works.microfrontends')}
                    </Tabs.Tab>
                    <Tabs.Tab value="aws" ref={setControlRef('aws')} className={classes.tab}>
                        {t('works.aws')}
                    </Tabs.Tab>
                    <Tabs.Tab value="games" ref={setControlRef('games')} className={classes.tab}>
                        {t('works.games')}
                    </Tabs.Tab>

                    <FloatingIndicator
                        target={value ? controlsRefs[value] : null}
                        parent={rootRef}
                        className={classes.indicator}
                    />
                </Tabs.List>

                <Tabs.Panel value="itinerary-builder">
                    <Suspense fallback={<div style={{ padding: '1rem' }}>{t('works.loadingMap')}</div>}>
                        <MapsTab />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel value="people-groups-map">
                    <Suspense fallback={<div style={{ padding: '1rem' }}>{t('works.loadingMap')}</div>}>
                        <PeopleMapTab />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel value="micro-frontends">{t('works.mfeBlurb')}</Tabs.Panel>
                <Tabs.Panel value="aws">{t('works.awsBlurb')}</Tabs.Panel>
                <Tabs.Panel value="games"><GamesTab /></Tabs.Panel>
            </Tabs>
        </Stack>
        </>
    )
}

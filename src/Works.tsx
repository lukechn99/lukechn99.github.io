import { Suspense, lazy, useState } from 'react'
import { ActionIcon, FloatingIndicator, Stack, Tabs } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './Works.module.css'
import GamesTab from './GamesTab.tsx';

const MapsTab = lazy(() => import('./MapsTab.tsx'))
const PeopleMapTab = lazy(() => import('./PeopleMapTab.tsx'))

// Maps will include map tiles, routing, scrubbing, jumping to locations, travel pins, flights, etc.
// Micro-frontends should showcase module federated widgets like a calculator, Sankey diagram maker, and others
// AWS could include architectures, learnings, best practices, etc.
// After I finish the WebRTC games I can showcase some learnings there too. 

export default function Works() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('1');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node
        setControlsRefs(controlsRefs)
    }

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
            <Tabs variant="none" value={value} onChange={setValue} keepMounted={false}>
                <Tabs.List 
                    ref={setRootRef} 
                    className={classes.list}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                        {t('works.itinerary')}
                    </Tabs.Tab>
                    <Tabs.Tab value="peoples" ref={setControlRef('peoples')} className={classes.tab}>
                        {t('works.peopleMap')}
                    </Tabs.Tab>
                    <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                        {t('works.microfrontends')}
                    </Tabs.Tab>
                    <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
                        {t('works.aws')}
                    </Tabs.Tab>
                    <Tabs.Tab value="4" ref={setControlRef('4')} className={classes.tab}>
                        {t('works.games')}
                    </Tabs.Tab>

                    <FloatingIndicator
                        target={value ? controlsRefs[value] : null}
                        parent={rootRef}
                        className={classes.indicator}
                    />
                </Tabs.List>

                <Tabs.Panel value="1">
                    <Suspense fallback={<div style={{ padding: '1rem' }}>{t('works.loadingMap')}</div>}>
                        <MapsTab />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel value="peoples">
                    <Suspense fallback={<div style={{ padding: '1rem' }}>{t('works.loadingMap')}</div>}>
                        <PeopleMapTab />
                    </Suspense>
                </Tabs.Panel>
                <Tabs.Panel value="2">{t('works.mfeBlurb')}</Tabs.Panel>
                <Tabs.Panel value="3">{t('works.awsBlurb')}</Tabs.Panel>
                <Tabs.Panel value="4"><GamesTab /></Tabs.Panel>
            </Tabs>
        </Stack>
        </>
    )
}

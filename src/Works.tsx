import { useState } from 'react'
import { Center, FloatingIndicator, Stack, Tabs } from '@mantine/core'
import classes from './Works.module.css'
import Map from './Map.tsx';

// Maps will include map tiles, routing, scrubbing, jumping to locations, travel pins, flights, etc.
// Micro-frontends should showcase module federated widgets like a calculator, Sankey diagram maker, and others
// AWS could include architectures, learnings, best practices, etc.
// After I finish the WebRTC games I can showcase some learnings there too. 

function MapsTab() {
    return <Stack>
        Maps will include map tiles, routing, scrubbing, jumping to locations, travel pins, flights, etc.
        <Map />
    </Stack>
}

export default function Works() {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('1');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node
        setControlsRefs(controlsRefs)
    }

    return (
        <Stack
            align="stretch"
            w="80vw"
            mx="auto"
            style={{ overflow: 'hidden' }}
            gap="xs"
        >
            <Tabs variant="none" value={value} onChange={setValue}>
                <Tabs.List 
                    ref={setRootRef} 
                    className={classes.list}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                        Maps
                    </Tabs.Tab>
                    <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                        Micro-frontends
                    </Tabs.Tab>
                    <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
                        AWS
                    </Tabs.Tab>
                    <Tabs.Tab value="4" ref={setControlRef('4')} className={classes.tab}>
                        Games
                    </Tabs.Tab>

                    <FloatingIndicator
                        target={value ? controlsRefs[value] : null}
                        parent={rootRef}
                        className={classes.indicator}
                    />
                </Tabs.List>

                <Tabs.Panel value="1"><MapsTab /></Tabs.Panel>
                <Tabs.Panel value="2">Micro-frontends should showcase module federated widgets like a calculator, Sankey diagram maker, and others</Tabs.Panel>
                <Tabs.Panel value="3">AWS could include architectures, learnings, best practices, etc.</Tabs.Panel>
                <Tabs.Panel value="4">After I finish the WebRTC games I can showcase some learnings there too.</Tabs.Panel>
            </Tabs>
        </Stack>
    )
}

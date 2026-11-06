import { useEffect, useRef, useState } from 'react'
import { Button, Group, SegmentedControl, Slider, Switch, Text } from '@mantine/core'
import type { Copy } from './copy/en.ts'
import { Box, C, Crown, Lock, Mark, Phone, pressable, usePackets, wait, Wire, type Pt } from './kit.tsx'
import classes from './webrtc.module.css'

const MOVE_COLORS: string[] = [C.player, C.ok, 'var(--mantine-color-grape-6)', C.turn]
const pick = (n: number) => MOVE_COLORS[n % MOVE_COLORS.length]!

function Note({ children }: { children: React.ReactNode }) {
    return (
        <Text size="sm" c="dimmed" className={classes.note} aria-live="polite">
            {children}
        </Text>
    )
}

/* ------------------------------------------------------------------ */
/* 1. A server in the middle                                           */
/* ------------------------------------------------------------------ */

export function ServerDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const server: Pt = { x: 200, y: 52 }
    const names = [c.names.ana, c.names.ben, c.names.cal, c.names.dee]
    const phones: Pt[] = [{ x: 55, y: 245 }, { x: 150, y: 262 }, { x: 250, y: 262 }, { x: 345, y: 245 }]
    const [screens, setScreens] = useState<string[]>(phones.map(() => C.line))
    const [down, setDown] = useState(false)
    const [trips, setTrips] = useState(0)
    const [bytes, setBytes] = useState(0)
    const [checking, setChecking] = useState(false)
    const [serverScreen, setServerScreen] = useState<string>(C.line)
    const moves = useRef(0)
    const paint = (j: number, color: string) => setScreens((s) => s.map((x, k) => (k === j ? color : x)))

    async function move(i: number) {
        const color = pick(moves.current++)
        const up = { x: server.x, y: server.y + 24 }
        // Stage 1: the move leaves your phone and reaches the server.
        paint(i, color)
        if (down) {
            await send([phones[i]!, up], { color, dur: 1200, fade: true })
            return
        }
        await send([phones[i]!, up], { color, dur: 1100 })
        setTrips((t) => t + 1)
        setChecking(true)
        setServerScreen(color)
        await wait(1000)
        setChecking(false)
        // Stage 2: the server tells everyone else.
        await Promise.all(phones.map((p, j) => (j === i ? Promise.resolve() : send([up, p], { color, dur: 1100 }).then(() => paint(j, color)))))
        setBytes((b) => b + 0.3 * phones.length)
    }

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 0 400 312" className={classes.svg} role="img" aria-label={c.server.title}>
                {phones.map((p, i) => (
                    <Wire key={i} a={p} b={{ x: server.x, y: server.y + 24 }} dash="5 5" opacity={down ? 0.4 : 1} />
                ))}
                <text x={200} y={150} textAnchor="middle" fontSize={11} fill={C.dim} fontStyle="italic">
                    {c.server.far}
                </text>
                <Box at={server} w={170} h={46} label={c.server.serverLabel} sub={c.server.serverSub} color={checking ? C.ok : C.server} dim={down} swatch={serverScreen} />
                {down && <Mark ok={false} at={{ x: 282, y: 34 }} />}
                {dots}
                {phones.map((p, i) => (
                    <g key={i} {...pressable(`${names[i]!}: ${c.server.tryIt}`, () => void move(i))}>
                        <Phone at={p} name={names[i]!} screen={screens[i]!} />
                    </g>
                ))}
            </svg>
            <Group justify="space-between" gap="xs" className={classes.controls}>
                <Text size="sm">{c.server.tryIt}</Text>
                <Switch checked={down} onChange={(e) => setDown(e.currentTarget.checked)} label={c.server.down} />
            </Group>
            <Note>{down ? c.server.downNote : `${c.server.trips(trips)} · ${c.server.bill(bytes.toFixed(1))}`}</Note>
        </figure>
    )
}

/* ------------------------------------------------------------------ */
/* 2. Phones talking to a host                                          */
/* ------------------------------------------------------------------ */

const HOST: Pt = { x: 200, y: 182 }
const PLAYERS: Pt[] = [{ x: 62, y: 96 }, { x: 338, y: 96 }, { x: 62, y: 282 }, { x: 338, y: 282 }]
const SPY = 3

export function HostDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const names = [c.names.ana, c.names.ben, c.names.cal, c.names.dee]
    const [screens, setScreens] = useState<string[]>(PLAYERS.map(() => C.line))
    const [hostScreen, setHostScreen] = useState<string>(C.line)
    const [secret, setSecret] = useState(false)
    const [away, setAway] = useState(false)
    const [checking, setChecking] = useState<null | 'ok' | 'no'>(null)
    const [note, setNote] = useState<string | null>(null)
    const moves = useRef(0)

    const paint = (j: number, color: string) => setScreens((s) => s.map((x, k) => (k === j ? color : x)))

    async function move(i: number) {
        if (away) return
        const color = pick(moves.current++)
        // Stage 1: the move goes to the host, who checks it and updates the game.
        paint(i, color)
        await send([PLAYERS[i]!, HOST], { color, dur: 750 })
        setChecking('ok')
        setHostScreen(color)
        await wait(1000)
        setChecking(null)
        // Stage 2: the host sends each other player their update.
        await Promise.all(
            PLAYERS.map((p, j) =>
                j === i
                    ? Promise.resolve()
                    : send([HOST, p], {
                          color: secret && j === SPY ? C.server : color,
                          label: secret ? (j === SPY ? '?' : '✓') : undefined,
                          dur: 750,
                      }).then(() => paint(j, color)),
            ),
        )
    }

    async function cheat() {
        if (away) return
        setNote(c.host.cheatNote)
        await send([PLAYERS[1]!, HOST], { color: C.bad, label: '!', dur: 650 })
        setChecking('no')
        await wait(500)
        await send([HOST, PLAYERS[1]!], { color: C.bad, dur: 650, fade: true })
        setChecking(null)
    }

    async function toggleHost() {
        if (!away) {
            setAway(true)
            setNote(c.host.awayNote)
            return
        }
        setAway(false)
        await Promise.all(PLAYERS.map((p, i) => wait(i * 120).then(() => send([p, HOST], { color: C.player, dur: 500 }))))
        await Promise.all(PLAYERS.map((p) => send([HOST, p], { color: C.host, dur: 500 })))
        setNote(null)
    }

    const screenText = (j: number | 'host') => {
        if (!secret) return null
        const spy = j === SPY
        return (
            <text y={2} textAnchor="middle" fontSize={7} fontWeight={700} fill={C.text}>
                {spy ? c.host.spy : c.host.location}
            </text>
        )
    }

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 0 400 340" className={classes.svg} role="img" aria-label={c.host.title}>
                <Wire a={{ x: 200, y: 52 }} b={{ x: HOST.x, y: HOST.y - 30 }} dash="2 5" opacity={0.6} />
                <Box at={{ x: 200, y: 36 }} w={150} h={36} label={c.host.broker} sub={c.host.brokerSub} color={C.line} />
                {PLAYERS.map((p, i) => (
                    <Wire key={i} a={p} b={HOST} color={away ? C.line : C.host} dash={away ? '4 6' : undefined} width={2} opacity={away ? 0.5 : 0.8} />
                ))}
                <Phone
                    at={HOST}
                    name={c.names.host}
                    screen={hostScreen}
                    dim={away}
                    ring={checking === 'ok' ? C.ok : checking === 'no' ? C.bad : undefined}
                    badge={<Crown />}
                >
                    {screenText('host')}
                </Phone>
                {checking === 'no' && <Mark ok={false} at={{ x: HOST.x + 26, y: HOST.y - 22 }} />}
                {dots}
                {PLAYERS.map((p, i) => (
                    <g key={i} {...pressable(`${names[i]!}: ${c.host.tryIt}`, () => void move(i), away)}>
                        <Phone at={p} name={names[i]!} screen={screens[i]!} dim={false}>
                            {screenText(i)}
                        </Phone>
                    </g>
                ))}
            </svg>
            <Text size="sm" className={classes.controls}>{c.host.tryIt}</Text>
            <Group gap="xs" className={classes.controls}>
                <Switch
                    checked={secret}
                    onChange={(e) => {
                        setSecret(e.currentTarget.checked)
                        setNote(e.currentTarget.checked ? c.host.secretNote : null)
                    }}
                    label={c.host.secret}
                />
                <Button size="xs" variant="light" color="red" onClick={() => void cheat()} disabled={away}>
                    {c.host.cheat}
                </Button>
                <Button size="xs" variant="light" color="yellow" onClick={() => void toggleHost()}>
                    {away ? c.host.back : c.host.leave}
                </Button>
            </Group>
            {note && <Note>{note}</Note>}
        </figure>
    )
}

/** Hero: the host diagram on its own, making moves by itself. */
export function HostAmbient({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const [screens, setScreens] = useState<string[]>(PLAYERS.map(() => C.line))
    const [hostScreen, setHostScreen] = useState<string>(C.line)
    const [pulse, setPulse] = useState(false)
    useEffect(() => {
        let stop = false
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
        ;(async () => {
            let n = 0
            await wait(600)
            while (!stop) {
                const i = Math.floor(Math.random() * PLAYERS.length)
                const color = pick(n++)
                const paint = (j: number) => !stop && setScreens((s) => s.map((x, k) => (k === j ? color : x)))
                paint(i)
                await send([PLAYERS[i]!, HOST], { color, dur: 750 })
                if (stop) break
                setPulse(true)
                setHostScreen(color)
                await wait(1000)
                setPulse(false)
                await Promise.all(PLAYERS.map((p, j) => (j === i ? Promise.resolve() : send([HOST, p], { color, dur: 750 }).then(() => paint(j)))))
                await wait(1100)
            }
        })()
        return () => {
            stop = true
        }
    }, [send])
    const names = [c.names.ana, c.names.ben, c.names.cal, c.names.dee]
    return (
        <figure className={classes.figure}>
            <svg viewBox="0 40 400 290" className={classes.svg} role="img" aria-label={c.hero.caption}>
                {PLAYERS.map((p, i) => (
                    <Wire key={i} a={p} b={HOST} color={C.host} width={2} opacity={0.8} />
                ))}
                <Phone at={HOST} name={c.names.host} screen={hostScreen} badge={<Crown />} ring={pulse ? C.ok : undefined} />
                {dots}
                {PLAYERS.map((p, i) => (
                    <Phone key={i} at={p} name={names[i]!} screen={screens[i]!} />
                ))}
            </svg>
            <figcaption>
                <Text size="sm" c="dimmed" ta="center">{c.hero.caption}</Text>
            </figcaption>
        </figure>
    )
}

/* ------------------------------------------------------------------ */
/* 3. Star vs mesh                                                      */
/* ------------------------------------------------------------------ */

export function TopologyDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const [n, setN] = useState(5)
    const [mode, setMode] = useState<'star' | 'mesh'>('star')
    const center: Pt = { x: 200, y: 150 }
    const ring = (count: number) =>
        Array.from({ length: count }, (_, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / count
            return { x: center.x + Math.cos(a) * 118, y: center.y + Math.sin(a) * 112 }
        })
    const nodes = mode === 'star' ? [center, ...ring(n - 1)] : ring(n)
    const links: [number, number][] = []
    if (mode === 'star') for (let i = 1; i < n; i++) links.push([0, i])
    else for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) links.push([i, j])

    const key = `${mode}-${n}`
    useEffect(() => {
        let stop = false
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
        ;(async () => {
            await wait(400)
            while (!stop) {
                const from = mode === 'star' ? 0 : Math.floor(Math.random() * n)
                const pts = mode === 'star' ? [center, ...ring(n - 1)] : ring(n)
                await Promise.all(pts.map((p, j) => (j === from ? Promise.resolve() : send([pts[from]!, p], { color: mode === 'star' ? C.host : C.player, dur: 700 }))))
                await wait(700)
            }
        })()
        return () => {
            stop = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, send])

    const total = links.length
    const perPhone = mode === 'star' ? c.topo.hostOnly(n - 1) : String(n - 1)

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 18 400 268" className={classes.svg} role="img" aria-label={`${mode === 'star' ? c.topo.star : c.topo.mesh}, ${c.topo.players(n)}`}>
                {links.map(([a, b], i) => (
                    <Wire key={`${key}-${i}`} a={nodes[a]!} b={nodes[b]!} color={mode === 'star' ? C.host : C.player} width={mode === 'mesh' && n > 6 ? 1 : 1.6} opacity={0.6} />
                ))}
                {dots}
                {nodes.map((p, i) => (
                    <g key={`${key}-n${i}`} transform={`translate(${p.x} ${p.y}) scale(0.7)`}>
                        <Phone at={{ x: 0, y: 0 }} screen={mode === 'star' && i === 0 ? C.host : C.line} badge={mode === 'star' && i === 0 ? <Crown /> : undefined} />
                    </g>
                ))}
            </svg>
            <Group justify="center" className={classes.controls}>
                <SegmentedControl
                    value={mode}
                    onChange={(v) => setMode(v as 'star' | 'mesh')}
                    data={[{ value: 'star', label: c.topo.star }, { value: 'mesh', label: c.topo.mesh }]}
                />
            </Group>
            <div className={classes.controls}>
                <Text size="sm" mb={4}>{c.topo.players(n)}</Text>
                <Slider min={2} max={10} step={1} value={n} onChange={setN} marks={[{ value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }, { value: 10 }]} label={null} aria-label={c.topo.players(n)} />
            </div>
            <dl className={classes.stats}>
                <div><dt>{c.topo.stats.links}</dt><dd>{total}</dd></div>
                <div><dt>{c.topo.stats.perPhone}</dt><dd>{perPhone}</dd></div>
            </dl>
            {mode === 'mesh' && <Note>{c.topo.meshNote}</Note>}
        </figure>
    )
}

/* ------------------------------------------------------------------ */
/* 4. STUN, step by step                                                */
/* ------------------------------------------------------------------ */

const A: Pt = { x: 48, y: 262 }
const B: Pt = { x: 352, y: 262 }
const RA: Pt = { x: 112, y: 214 }
const RB: Pt = { x: 288, y: 214 }

function Houses({ c, holeA, holeB }: { c: Copy; holeA?: boolean; holeB?: boolean }) {
    return (
        <g>
            <rect x={10} y={168} width={152} height={130} rx={10} fill="none" stroke={C.line} strokeWidth={1.5} />
            <rect x={238} y={168} width={152} height={130} rx={10} fill="none" stroke={C.line} strokeWidth={1.5} />
            <text x={20} y={186} fontSize={11} fill={C.dim}>{c.stun.home}</text>
            <text x={380} y={186} fontSize={11} fill={C.dim} textAnchor="end">{c.stun.home}</text>
            <Wire a={A} b={RA} />
            <Wire a={B} b={RB} />
            <Box at={RA} w={84} h={30} label={c.stun.router} color={holeA ? C.ok : C.text} />
            <Box at={RB} w={84} h={30} label={c.stun.router} color={holeB ? C.ok : C.text} />
        </g>
    )
}

export function StunDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const [step, setStep] = useState(0)
    const steps = c.stun.steps
    const STUN: Pt = { x: 200, y: 44 }
    const BROKER: Pt = { x: 200, y: 112 }
    const shown = (s: number) => step >= s

    useEffect(() => {
        let stop = false
        ;(async () => {
            if (step === 1) {
                await Promise.all([
                    send([A, RA, { x: STUN.x - 30, y: STUN.y + 18 }, RA, A], { color: C.stun, dur: 2000 }),
                    send([B, RB, { x: STUN.x + 30, y: STUN.y + 18 }, RB, B], { color: C.stun, dur: 2000 }),
                ])
            } else if (step === 2) {
                await Promise.all([
                    send([A, RA, BROKER, RB, B], { color: C.host, dur: 1800 }),
                    send([B, RB, BROKER, RA, A], { color: C.host, dur: 1800 }),
                ])
            } else if (step === 3) {
                await Promise.all([send([A, RA, RB], { color: C.ok, dur: 1300 }), send([B, RB, RA], { color: C.ok, dur: 1300 })])
            } else if (step === 4) {
                await wait(300)
                while (!stop) {
                    await send([A, RA, RB, B], { color: C.player, dur: 1100 })
                    if (stop) break
                    await send([B, RB, RA, A], { color: C.ok, dur: 1100 })
                }
            }
        })()
        return () => {
            stop = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, send])

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 18 400 290" className={classes.svg} role="img" aria-label={steps[step]}>
                <Box at={STUN} w={140} h={40} label={c.stun.stunLabel} sub={c.stun.stunSub} color={C.stun} dim={step === 4} />
                <Box at={BROKER} w={110} h={30} label={c.stun.broker} color={C.host} dim={step !== 2} />
                {step === 4 && <Wire a={RA} b={RB} color={C.ok} width={3} />}
                <Houses c={c} holeA={shown(3)} holeB={shown(3)} />
                <Phone at={A} />
                <Phone at={B} />
                <text x={A.x + 22} y={A.y + 16} fontSize={11} fill={C.dim} fontFamily="ui-monospace, monospace">192.168.1.23</text>
                <text x={B.x - 22} y={B.y + 16} fontSize={11} fill={C.dim} textAnchor="end" fontFamily="ui-monospace, monospace">10.0.0.7</text>
                {shown(1) && step >= 1 && (
                    <g className="wr-pop">
                        <text x={86} y={160} fontSize={11} textAnchor="middle" fill={C.stun} fontWeight={600} fontFamily="ui-monospace, monospace">73.42.18.9:51234</text>
                        <text x={314} y={160} fontSize={11} textAnchor="middle" fill={C.stun} fontWeight={600} fontFamily="ui-monospace, monospace">98.6.211.4:40112</text>
                    </g>
                )}
                {step === 4 && <Lock at={{ x: 200, y: 184 }} />}
                {dots}
            </svg>
            <div className={classes.stepper}>
                <Text size="xs" c="dimmed">{c.stun.step(step + 1, steps.length)}</Text>
                <Text size="sm" aria-live="polite" className={classes.stepText}>{steps[step]}</Text>
                <Group gap="xs">
                    <Button size="xs" variant="default" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>{c.stun.prev}</Button>
                    {step < steps.length - 1 ? (
                        <Button size="xs" onClick={() => setStep((s) => s + 1)}>{c.stun.next}</Button>
                    ) : (
                        <Button size="xs" variant="light" onClick={() => setStep(0)}>{c.stun.restart}</Button>
                    )}
                </Group>
            </div>
        </figure>
    )
}

/* ------------------------------------------------------------------ */
/* 5. TURN                                                              */
/* ------------------------------------------------------------------ */

type TurnPhase = 'idle' | 'trying' | 'direct' | 'blocked' | 'relay'

export function TurnDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const [net, setNet] = useState<'open' | 'strict'>('strict')
    const [phase, setPhase] = useState<TurnPhase>('idle')
    const run = useRef(0)
    const RELAY: Pt = { x: 200, y: 64 }

    async function connect() {
        const id = ++run.current
        setPhase('trying')
        if (net === 'open') {
            await send([A, RA, RB, B], { color: C.ok, dur: 1300 })
            if (id !== run.current) return
            setPhase('direct')
            while (id === run.current) {
                await send([A, RA, RB, B], { color: C.player, dur: 1000 })
                if (id !== run.current) break
                await send([B, RB, RA, A], { color: C.ok, dur: 1000 })
            }
            return
        }
        await send([A, RA, RB], { color: C.ok, dur: 1100 })
        if (id !== run.current) return
        setPhase('blocked')
        await wait(1400)
        if (id !== run.current) return
        setPhase('relay')
        while (id === run.current) {
            await send([A, RA, { x: RELAY.x - 20, y: RELAY.y + 22 }, { x: RELAY.x + 20, y: RELAY.y + 22 }, RB, B], { color: C.player, dur: 1500 })
            if (id !== run.current) break
            await send([B, RB, { x: RELAY.x + 20, y: RELAY.y + 22 }, { x: RELAY.x - 20, y: RELAY.y + 22 }, RA, A], { color: C.ok, dur: 1500 })
        }
    }

    useEffect(() => () => void run.current++, [])

    const status = { idle: null, trying: c.turn.trying, direct: c.turn.directOk, blocked: c.turn.blocked, relay: c.turn.relayOk }[phase]

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 18 400 290" className={classes.svg} role="img" aria-label={status ?? c.turn.title}>
                {phase === 'relay' && (
                    <>
                        <Wire a={RA} b={{ x: RELAY.x - 20, y: RELAY.y + 22 }} color={C.turn} width={2.5} />
                        <Wire a={RB} b={{ x: RELAY.x + 20, y: RELAY.y + 22 }} color={C.turn} width={2.5} />
                    </>
                )}
                {phase === 'direct' && <Wire a={RA} b={RB} color={C.ok} width={3} />}
                <Box at={RELAY} w={140} h={44} label={c.turn.relayLabel} sub={c.turn.relaySub} color={C.turn} dim={phase !== 'relay'} />
                {phase === 'relay' && <Lock at={{ x: RELAY.x + 82, y: RELAY.y }} />}
                <Houses c={c} holeA={phase === 'direct'} holeB={phase === 'direct'} />
                {net === 'strict' && (
                    <text x={RB.x} y={RB.y + 30} fontSize={11} textAnchor="middle" fill={C.bad}>
                        {c.turn.strict}
                    </text>
                )}
                {phase === 'blocked' && <Mark ok={false} at={{ x: RB.x - 34, y: RB.y - 16 }} />}
                <Phone at={A} />
                <Phone at={B} />
                {dots}
            </svg>
            <Group justify="space-between" gap="xs" className={classes.controls}>
                <div>
                    <Text size="xs" c="dimmed" mb={2}>{c.turn.network}</Text>
                    <SegmentedControl
                        size="xs"
                        value={net}
                        onChange={(v) => {
                            run.current++
                            setNet(v as 'open' | 'strict')
                            setPhase('idle')
                        }}
                        data={[{ value: 'open', label: c.turn.open }, { value: 'strict', label: c.turn.strict }]}
                    />
                </div>
                <Button size="xs" onClick={() => void connect()} disabled={phase === 'trying' || phase === 'blocked'}>
                    {c.turn.connect}
                </Button>
            </Group>
            {status && <Note>{status}{phase === 'relay' ? ` ${c.turn.encrypted}` : ''}</Note>}
        </figure>
    )
}

/* ------------------------------------------------------------------ */
/* 6. The bot check and budget                                          */
/* ------------------------------------------------------------------ */

export function GuardDiagram({ c }: { c: Copy }) {
    const { send, dots } = usePackets()
    const [capped, setCapped] = useState(false)
    const [who, setWho] = useState<'player' | 'bot' | null>(null)
    const [result, setResult] = useState<null | 'ok' | 'bot' | 'cap'>(null)
    const [marks, setMarks] = useState<{ at: Pt; ok: boolean }[]>([])
    const run = useRef(0)
    const X = 170
    const V: Pt = { x: X, y: 44 }, K: Pt = { x: X, y: 124 }, W: Pt = { x: X, y: 204 }, T: Pt = { x: X, y: 284 }
    const side = 340

    async function go(kind: 'player' | 'bot') {
        const id = ++run.current
        setWho(kind)
        setResult(null)
        setMarks([])
        const mark = (at: Pt, ok: boolean) => setMarks((m) => [...m, { at: { x: at.x + 96, y: at.y }, ok }])
        await send([{ x: X, y: V.y + 20 }, { x: X, y: K.y - 20 }], { color: kind === 'bot' ? C.bad : C.player, dur: 700 })
        if (id !== run.current) return
        if (kind === 'bot') {
            mark(K, false)
            setResult('bot')
            return
        }
        mark(K, true)
        await send([{ x: X, y: K.y + 20 }, { x: X, y: W.y - 20 }], { color: C.player, dur: 700, label: '✓' })
        if (id !== run.current) return
        if (capped) {
            mark(W, false)
            setResult('cap')
            return
        }
        mark(W, true)
        await send([{ x: X, y: W.y + 20 }, { x: X, y: T.y - 20 }], { color: C.player, dur: 700 })
        if (id !== run.current) return
        await send([{ x: X + 85, y: T.y }, { x: side, y: T.y }, { x: side, y: V.y }, { x: X + 85, y: V.y }], { color: C.turn, label: '3h', dur: 1400 })
        if (id !== run.current) return
        setResult('ok')
    }

    useEffect(() => () => void run.current++, [])

    return (
        <figure className={classes.figure}>
            <svg viewBox="0 10 400 310" className={classes.svg} role="img" aria-label={c.guard.title}>
                <path d={`M ${X + 85} ${T.y} H ${side} V ${V.y} H ${X + 85}`} fill="none" stroke={C.turn} strokeDasharray="4 5" opacity={0.6} />
                <Wire a={{ x: X, y: V.y }} b={{ x: X, y: T.y }} />
                <Box at={V} w={170} h={40} label={who === 'bot' ? c.guard.bot : c.guard.visitor} color={who === 'bot' ? C.bad : C.player} />
                <Box at={K} w={170} h={40} label={c.guard.check} sub={c.guard.checkSub} color={C.ok} />
                <Box at={W} w={170} h={40} label={c.guard.worker} sub={capped ? c.guard.capped : c.guard.workerSub} color={capped ? C.bad : C.host} />
                <Box at={T} w={170} h={40} label={c.guard.relay} sub={c.guard.relaySub} color={C.turn} />
                {marks.map((m, i) => (
                    <Mark key={i} ok={m.ok} at={m.at} />
                ))}
                {result === 'ok' && <Lock at={{ x: X - 104, y: V.y }} />}
                {dots}
            </svg>
            <Group gap="xs" className={classes.controls}>
                <Button size="xs" onClick={() => void go('player')}>{c.guard.player}</Button>
                <Button size="xs" variant="light" color="red" onClick={() => void go('bot')}>{c.guard.bot}</Button>
                <Switch
                    checked={capped}
                    onChange={(e) => {
                        run.current++
                        setCapped(e.currentTarget.checked)
                        setResult(null)
                        setMarks([])
                    }}
                    label={c.guard.capped}
                />
            </Group>
            {result && <Note>{result === 'ok' ? c.guard.okNote : result === 'bot' ? c.guard.botNote : c.guard.capNote}</Note>}
        </figure>
    )
}

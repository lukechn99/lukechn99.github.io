/**
 * Shared pieces for the WebRTC explainer diagrams: animated "packets" that
 * travel along paths, and the little devices, boxes and wires they travel
 * between. Everything is SVG in a 400-wide viewBox so it scales to phones.
 */
import { useCallback, useEffect, useReducer, useRef, type KeyboardEvent, type ReactNode } from 'react'

export type Pt = { x: number; y: number }

export const C = {
    text: 'var(--mantine-color-text)',
    dim: 'var(--mantine-color-dimmed)',
    body: 'var(--mantine-color-body)',
    line: 'var(--mantine-color-default-border)',
    card: 'var(--mantine-color-default)',
    host: 'var(--mantine-color-yellow-6)',
    player: 'var(--mantine-color-blue-6)',
    server: 'var(--mantine-color-gray-6)',
    stun: 'var(--mantine-color-violet-6)',
    turn: 'var(--mantine-color-orange-6)',
    bad: 'var(--mantine-color-red-6)',
    ok: 'var(--mantine-color-teal-6)',
}

export function reducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

interface Packet {
    id: number
    path: Pt[]
    t0: number
    dur: number
    color: string
    label?: string | undefined
    fade?: boolean | undefined
    done: () => void
}

function along(path: Pt[], t: number): Pt {
    if (path.length === 1) return path[0]!
    const segs = path.slice(1).map((p, i) => Math.hypot(p.x - path[i]!.x, p.y - path[i]!.y))
    const total = segs.reduce((a, b) => a + b, 0) || 1
    let d = t * total
    for (let i = 0; i < segs.length; i++) {
        const seg = segs[i]!
        if (d <= seg || i === segs.length - 1) {
            const k = seg ? Math.min(1, d / seg) : 1
            const a = path[i]!, b = path[i + 1]!
            return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
        }
        d -= seg
    }
    return path[path.length - 1]!
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

/**
 * A little animation engine: `send(path)` launches a dot along the path and
 * resolves when it arrives, so sequences read like a story:
 *   await send([a, host]); await Promise.all(players.map(p => send([host, p])))
 */
export function usePackets() {
    const [, redraw] = useReducer((n: number) => n + 1, 0)
    const list = useRef<Packet[]>([])
    const raf = useRef(0)
    const nextId = useRef(1)
    const alive = useRef(true)

    useEffect(() => {
        alive.current = true
        return () => {
            alive.current = false
            cancelAnimationFrame(raf.current)
            raf.current = 0
            for (const p of list.current) p.done()
            list.current = []
        }
    }, [])

    const tick = useCallback(() => {
        const now = performance.now()
        const finished = list.current.filter((p) => now - p.t0 >= p.dur)
        list.current = list.current.filter((p) => now - p.t0 < p.dur)
        finished.forEach((p) => p.done())
        redraw()
        raf.current = list.current.length && alive.current ? requestAnimationFrame(tick) : 0
    }, [])

    const send = useCallback(
        (path: Pt[], opts: { dur?: number | undefined; color?: string | undefined; label?: string | undefined; fade?: boolean | undefined } = {}) =>
            new Promise<void>((resolve) => {
                if (!alive.current) return resolve()
                const dur = reducedMotion() ? 1 : opts.dur ?? 900
                list.current.push({ id: nextId.current++, path, t0: performance.now(), dur, color: opts.color ?? C.player, label: opts.label, fade: opts.fade, done: resolve })
                if (!raf.current) raf.current = requestAnimationFrame(tick)
            }),
        [tick],
    )

    const now = performance.now()
    const dots = (
        <g aria-hidden="true">
            {list.current.map((p) => {
                const t = Math.min(1, (now - p.t0) / p.dur)
                const at = along(p.path, ease(t))
                const opacity = p.fade ? 1 - t * 0.9 : 1
                return (
                    <g key={p.id} transform={`translate(${at.x} ${at.y})`} opacity={opacity}>
                        <circle r={p.label ? 9 : 6} fill={p.color} stroke={C.body} strokeWidth={2} />
                        {p.label && (
                            <text y={3.5} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">
                                {p.label}
                            </text>
                        )}
                    </g>
                )
            })}
        </g>
    )
    return { send, dots, busy: () => list.current.length > 0 }
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms))

/** Make an SVG group behave like a button (click, Enter, Space). */
export function pressable(label: string, onPress: () => void, disabled = false) {
    return {
        role: 'button',
        tabIndex: disabled ? -1 : 0,
        'aria-label': label,
        'aria-disabled': disabled || undefined,
        style: { cursor: disabled ? 'default' : 'pointer', outline: 'none' },
        className: 'wr-press',
        onClick: () => !disabled && onPress(),
        onKeyDown: (e: KeyboardEvent) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onPress()
            }
        },
    }
}

/** A phone. `screen` colours its display; `badge` floats above it. */
export function Phone({ at, name, screen, badge, dim, ring, children }: {
    at: Pt; name?: string | undefined; screen?: string | undefined; badge?: ReactNode; dim?: boolean | undefined; ring?: string | undefined; children?: ReactNode
}) {
    return (
        <g transform={`translate(${at.x} ${at.y})`} opacity={dim ? 0.35 : 1} style={{ transition: 'opacity 300ms' }}>
            {ring && <rect x={-19} y={-27} width={38} height={54} rx={9} fill="none" stroke={ring} strokeWidth={3} className="wr-pulse" />}
            <rect x={-14} y={-22} width={28} height={44} rx={6} fill={C.card} stroke={C.text} strokeWidth={1.6} />
            <rect x={-10} y={-16} width={20} height={30} rx={2} fill={screen ?? C.line} style={{ transition: 'fill 300ms' }} />
            <circle cy={18} r={1.6} fill={C.text} />
            {children}
            {badge && <g transform="translate(0 -34)">{badge}</g>}
            {name && (
                <text y={40} textAnchor="middle" fontSize={14} fill={C.text}>
                    {name}
                </text>
            )}
        </g>
    )
}

export function Box({ at, w, h, label, sub, color, dim, icon, swatch }: {
    at: Pt; w: number; h: number; label: string; sub?: string | undefined; color: string; dim?: boolean | undefined; icon?: ReactNode
    /** A little "screen" on the right showing this box's current game state. */
    swatch?: string | undefined
}) {
    return (
        <g transform={`translate(${at.x} ${at.y})`} opacity={dim ? 0.3 : 1} style={{ transition: 'opacity 300ms' }}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill={C.card} stroke={color} strokeWidth={2} />
            {icon && <g transform={`translate(${-w / 2 + 14} 0)`}>{icon}</g>}
            {swatch && <rect x={w / 2 - 22} y={-12} width={14} height={24} rx={3} fill={swatch} stroke={C.text} strokeWidth={1} style={{ transition: 'fill 300ms' }} />}
            <text x={icon ? 8 : 0} y={sub ? -2 : 5} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.text}>
                {label}
            </text>
            {sub && (
                <text x={icon ? 8 : 0} y={13} textAnchor="middle" fontSize={11} fill={C.dim}>
                    {sub}
                </text>
            )}
        </g>
    )
}

export function Wire({ a, b, color = C.line, dash, width = 1.6, opacity = 1 }: { a: Pt; b: Pt; color?: string | undefined; dash?: string | undefined; width?: number | undefined; opacity?: number | undefined }) {
    return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} style={{ transition: 'opacity 300ms, stroke 300ms' }} />
}

export function Crown({ color = C.host }: { color?: string }) {
    return <path d="M-9 4 L-9 -4 L-4.5 0 L0 -7 L4.5 0 L9 -4 L9 4 Z" fill={color} stroke={C.body} strokeWidth={1} />
}

export function Mark({ ok, at }: { ok: boolean; at: Pt }) {
    return (
        <g transform={`translate(${at.x} ${at.y})`} className="wr-pop">
            <circle r={11} fill={ok ? C.ok : C.bad} />
            <path d={ok ? 'M-5 0 L-1.5 4 L5 -4' : 'M-4.5 -4.5 L4.5 4.5 M4.5 -4.5 L-4.5 4.5'} stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        </g>
    )
}

export function Lock({ at }: { at: Pt }) {
    return (
        <g transform={`translate(${at.x} ${at.y})`}>
            <rect x={-6} y={-2} width={12} height={9} rx={2} fill={C.ok} />
            <path d="M-3.5 -2 V-5 a3.5 3.5 0 0 1 7 0 V-2" stroke={C.ok} strokeWidth={2} fill="none" />
        </g>
    )
}

import type { PeopleNode } from './types.ts'
import { indoEuropean } from './data/indoEuropean.ts'
import { asia } from './data/asia.ts'
import { africaMiddleEast } from './data/africaMiddleEast.ts'
import { pacificAmericas } from './data/pacificAmericas.ts'
import { unitedStates } from './data/unitedStates.ts'

export type { PeopleNode, PeopleInfo } from './types.ts'

export const PEOPLE_NODES: PeopleNode[] = [
    ...indoEuropean,
    ...asia,
    ...africaMiddleEast,
    ...pacificAmericas,
    ...unitedStates,
]

export const NODE_BY_ID: Map<string, PeopleNode> = new Map(PEOPLE_NODES.map(n => [n.id, n]))

export const CHILDREN: Map<string, PeopleNode[]> = (() => {
    const m = new Map<string, PeopleNode[]>()
    for (const n of PEOPLE_NODES) {
        const key = n.parent ?? '__root__'
        const list = m.get(key) ?? []
        list.push(n)
        m.set(key, list)
    }
    return m
})()

export const ROOTS: PeopleNode[] = CHILDREN.get('__root__') ?? []

export function childrenOf(id: string): PeopleNode[] {
    return CHILDREN.get(id) ?? []
}

/** Depth of a node: roots are depth 1. */
export function depthOf(id: string): number {
    let d = 0
    let cur = NODE_BY_ID.get(id)
    while (cur) {
        d++
        cur = cur.parent ? NODE_BY_ID.get(cur.parent) : undefined
    }
    return d
}

/** Path from root to node, inclusive. */
export function pathTo(id: string): PeopleNode[] {
    const out: PeopleNode[] = []
    let cur = NODE_BY_ID.get(id)
    while (cur) {
        out.unshift(cur)
        cur = cur.parent ? NODE_BY_ID.get(cur.parent) : undefined
    }
    return out
}

/** All leaf ids under (and including, if a leaf) a node. */
export function leavesUnder(id: string): string[] {
    const kids = childrenOf(id)
    if (kids.length === 0) return [id]
    return kids.flatMap(k => leavesUnder(k.id))
}

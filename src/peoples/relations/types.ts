/**
 * One note about how a group gets along with a neighbour.
 * `with` is a node id when the neighbour is on the map (it becomes a clickable link);
 * otherwise `label` names a group that has no region of its own.
 */
export interface Relation {
    with?: string
    label?: string
    text: string
}

export type RelationsMap = Record<string, Relation[]>

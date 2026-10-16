export interface PeopleInfo {
    /** One or two sentences: who they are. */
    summary: string
    /** Rounded population estimate, for scale. */
    population?: string
    /** Where the group is concentrated today. */
    homeland?: string
    language?: string
    religion?: string
    food?: string
    /** Where the group's name comes from. */
    etymology?: string
    /** A key piece of history, rivalry or turning point. */
    history?: string
}

export interface PeopleNode {
    id: string
    parent: string | null
    name: string
    info: PeopleInfo
}

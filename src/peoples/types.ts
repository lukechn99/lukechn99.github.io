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
    /**
     * For top-level groups: the language family they belong to (e.g. "Indo-European").
     * Families are too broad to be people groups, so they are not nodes; this only
     * keeps related groups in a shared colour range and is explained in the relations.
     */
    family?: string
    name: string
    info: PeopleInfo
}

/** A formative piece of a group's literature or oral tradition. */
export interface Literature {
    title: string
    /** Author or source. */
    by?: string
    date: string
    /** BCP-47 tag of the original, so browsers pick the right font and shaping. */
    lang?: string
    /** The passage in its original language and script (line breaks as \n). */
    original?: string
    /** Romanization, for non-Latin scripts or when the original script isn't given. */
    romanized?: string
    /** English translation (own rendering unless noted). Omitted when the original is English. */
    translation?: string
    /** Why it matters to the group. */
    note: string
}

import type { Relation, RelationsMap } from './types.ts'
import { europeRelations } from './europe.ts'
import { asiaRelations } from './asia.ts'
import { africaMiddleEastRelations } from './africaMiddleEast.ts'
import { pacificAmericasRelations } from './pacificAmericas.ts'
import { unitedStatesRelations } from './unitedStates.ts'

export type { Relation } from './types.ts'

export const RELATIONS: RelationsMap = {
    ...europeRelations,
    ...asiaRelations,
    ...africaMiddleEastRelations,
    ...pacificAmericasRelations,
    ...unitedStatesRelations,
}

export function relationsOf(id: string): Relation[] {
    return RELATIONS[id] ?? []
}

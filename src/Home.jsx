import { InfinitePeople } from './people/InfinitePeople'
import { InfiniteSpecies } from './species/InfiniteSpecies'

import { Suspense } from 'react'
import Skeleton from './skeleton/Skeleton'
export default function Home({ value }) {
    return (
        <Suspense fallback={<Skeleton />}>
            {value === 'people' ? <InfinitePeople /> : <InfiniteSpecies />}
        </Suspense>
    )
}

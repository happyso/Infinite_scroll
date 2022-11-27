import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { Person } from './Person'

export function InfinitePeople() {
    const {
        data,
        isLoading,
        isError,
        error,
        hasNextPage,
        isFetchingNextPage,
        observerRef,
    } = useInfiniteScroll({
        key: ['sw-people'],
        initialUrl: 'https://swapi.dev/api/people/',
    })

    if (isLoading) return <div>loading</div>
    if (isError) return <div>Error! {error.toString()}</div>

    return (
        <>
            {data.pages.map((pageData) => {
                return pageData.results.map((person) => {
                    return (
                        <Person
                            key={person.name}
                            name={person.name}
                            hairColor={person.hair_color}
                            eyeColor={person.eye_color}
                        />
                    )
                })
            })}
            <button
                ref={observerRef}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
            </button>
        </>
    )
}

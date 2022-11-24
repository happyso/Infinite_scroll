import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Person } from './Person'

const initialUrl = 'https://swapi.dev/api/people/'
const fetchUrl = async (url) => {
    const response = await fetch(url)
    return response.json()
}

export function InfinitePeople() {
    const observerTarget = useRef()

    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(
        ['sw-people'],
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    )

    useEffect(() => {
        if (!observerTarget.current || !hasNextPage) return
        const io = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                fetchNextPage()
            }
        })
        io.observe(observerTarget.current)
        return () => {
            io.disconnect()
        }
    }, [fetchNextPage, hasNextPage, observerTarget])

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
                ref={observerTarget}
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

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Species } from './Species'

const initialUrl = 'https://swapi.dev/api/species/'
const fetchUrl = async (url) => {
    const response = await fetch(url)
    return response.json()
}

export function InfiniteSpecies() {
    const observerTargetEl = useRef()

    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(
        ['sw-species'],
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    )

    useEffect(() => {
        if (!observerTargetEl.current || !hasNextPage) return
        const io = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                fetchNextPage()
            }
        })
        io.observe(observerTargetEl.current)
        return () => {
            io.disconnect()
        }
    }, [fetchNextPage, hasNextPage, observerTargetEl])

    if (isLoading) return <div>loading</div>
    if (isError) return <div>Error! {error.toString()}</div>

    return (
        <>
            {data.pages.map((pageData) => {
                return pageData.results.map((species) => {
                    return (
                        <Species
                            key={species.name}
                            name={species.name}
                            language={species.language}
                            averageLifespan={species.average_lifespan}
                        />
                    )
                })
            })}
            <button
                ref={observerTargetEl}
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

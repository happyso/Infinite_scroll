import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function useInfiniteScroll(option) {
    const { key, initialUrl } = option
    const observerRef = useRef(null)
    const fetchUrl = async (url) => {
        const response = await fetch(url)
        return response.json()
    }
    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(
        key,
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.next || undefined
            },
        }
    )

    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return
        const io = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                fetchNextPage()
            }
        })
        io.observe(observerRef.current)
        return () => {
            io.disconnect()
        }
    }, [fetchNextPage, hasNextPage, observerRef])

    return {
        data,
        isLoading,
        isError,
        error,
        hasNextPage,
        isFetchingNextPage,
        observerRef,
    }
}

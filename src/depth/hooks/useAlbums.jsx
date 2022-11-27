import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

async function fetchAlbums(userID) {
    console.log(userID)
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userID}/albums`
    )
    return response.json()
}

export default function useAlbums() {
    const [userId, setUserId] = useState('')

    const { data: albumData, refetch } = useQuery(
        ['albums', userId],
        () => fetchAlbums(userId),
        {
            enabled: false,
        }
    )
    return { albumData, refetch, userId, setUserId }
}

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

async function fetchUsers() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    return response.json()
}

async function fetchAlbums(userID) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userID}/albums`
    )
    return response.json()
}

async function fetchPhoto(albumID) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumID}/photos`
    )
    return response.json()
}

/*data- >  [
    {
        id: ...
        username: ...
        child : [
            {
                id: ~ ,
                title :
                child: [
                    {
                        id: ~ ,
                        title :
                        child: []
                    }
                ]
            }
        ]
    }
]
*/

function convertTreeData(data) {}

function useUserList() {
    const { data, isLoading, error } = useQuery(['users'], fetchUsers)
    return { data, isLoading, error }
}

function useAlbums(id) {
    const { data, isLoading, refetch } = useQuery(
        ['albums', id],
        () => fetchAlbums(id),
        {
            staleTime: 5000,
            enabled: false,
        }
    )
    return { data, isLoading, refetch }
}

function useAlbumPhotos(id) {
    const { data, isLoading, refetch } = useQuery(
        ['photos', id],
        () => fetchPhoto(id),
        {
            staleTime: 5000,
            enabled: false,
        }
    )
    return { data, isLoading, refetch }
}

export default function useTreeData(level, id) {
    const [data, setData] = useState({
        1: [],
        2: [],
        3: [],
    })

    const { data: userData, isLoading } = useUserList()
    const {
        data: albumData,
        isLoading: albumLoding,
        refetch: albumRefetch,
    } = useAlbums(id)
    const {
        data: photoData,
        isLoading: photoLoding,
        refetch: photoRefetch,
    } = useAlbumPhotos(id)

    return { data, setData }
}

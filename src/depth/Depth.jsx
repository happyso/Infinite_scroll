import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import RadioGroup from '../RadioGroup'
import Radio from '../Radio'

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

export function DepthTwo({ id, depth }) {
    const [albumId, setAlbumId] = useState(0)
    const { data, isLoading } = useQuery(
        ['albums', id],
        () => fetchAlbums(id),
        {
            staleTime: 5000,
        }
    )

    if (isLoading) return <p>Loading ....</p>

    return (
        <RadioGroup label={depth} value={albumId} onChange={setAlbumId}>
            {data &&
                data.map((item) => {
                    return (
                        <Radio
                            key={item.id}
                            value={item.id}
                            style={{ display: 'block' }}
                            name={depth}
                        >
                            {item.title}

                            {Number(albumId) === item.id && (
                                <DepthThree id={albumId} depth="depth3" />
                            )}
                        </Radio>
                    )
                })}
        </RadioGroup>
    )
}

export function DepthThree({ id, depth }) {
    const [value, setValue] = useState(0)
    const { data, isLoading } = useQuery(['photos', id], () => fetchPhoto(id), {
        staleTime: 5000,
    })

    if (isLoading) return <p>Loading ....</p>

    return (
        <RadioGroup label={depth} value={value} onChange={setValue}>
            {data &&
                data.map((item) => {
                    return (
                        <Radio
                            key={item.id}
                            value={item.id}
                            style={{ display: 'block' }}
                            name={depth}
                        >
                            {item.title}
                        </Radio>
                    )
                })}
        </RadioGroup>
    )
}

export function Depth({ data }) {
    /* const data {
        1: []
        2: []
        3: []
    } */

    /* seletedTree setSelectedTree =  */
    const [userId, setUserId] = useState(0)
    const { data: userData, isLoading } = useQuery(
        ['users'],
        () => fetchUsers(),
        {
            staleTime: 5000,
        }
    )

    if (isLoading) return <p>Loading ....</p>

    return (
        <>
            <RadioGroup label="depth1" value={userId} onChange={setUserId}>
                {userData &&
                    userData.map((item) => {
                        return (
                            <div key={item.id}>
                                <Radio
                                    value={item.id}
                                    style={{ display: 'block' }}
                                    name="depth1"
                                >
                                    {item.id} : {item.name}
                                </Radio>
                                {Number(userId) === item.id && (
                                    <DepthTwo id={userId} depth="depth2" />
                                )}
                            </div>
                        )
                    })}
            </RadioGroup>
        </>
    )
}

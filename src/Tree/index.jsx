import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
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

const useBoardQuery = (item) => {
    const { data, isLoading } = useQuery(
        ['albums', item.id],
        () => fetchAlbums(item.id),
        {
            staleTime: 5000,
        }
    )
    return { data, isLoading }
}

function createTreeData(data, level) {
    return {
        1: data,
        2: [],
        3: [],
    }
}

const Tree = () => {
    const [data, setData] = useState({})
    const { data: userData, isLoading } = useQuery(
        ['users'],
        () => fetchUsers(),
        {
            staleTime: 5000,
        }
    )

    if (isLoading) return <p>Loading ....</p>

    const resultData = createTreeData(userData)
    console.log(resultData)

    return (
        <div className="wrapTree">
            {resultData &&
                Object.keys(resultData).map((key) => {
                    return (
                        <div key={key}>
                            {resultData[key].map((item) => {
                                return <div key={item.id}>{item.name}</div>
                            })}
                        </div>
                    )

                    // return <Branch key={key} item={data[key]} level={0} />
                })}
        </div>
    )
}

const Branch = ({ item, level }) => {
    const [selected, setSelected] = useState(item.selected ?? false)
    const hasChildren = level + 1 <= 3

    function RenderBranches() {
        if (hasChildren) {
            const newLevel = level + 1

            return item.children.map((child) => {
                return <Branch key={child.id} item={child} level={newLevel} />
            })
        }

        return null
    }

    const toggleSelected = () => {
        setSelected((prev) => !prev)
    }

    return (
        <>
            <Node
                item={item}
                selected={selected}
                hasChildren={hasChildren}
                level={level}
                onToggle={toggleSelected}
            />

            {selected && RenderBranches()}
        </>
    )
}

const Node = ({ item, hasChildren, level, onToggle }) => {
    return (
        <div style={{ paddingLeft: `${level * 16}px` }}>
            {item.label}

            {hasChildren && <button onClick={onToggle}>toggle</button>}
        </div>
    )
}

export default Tree

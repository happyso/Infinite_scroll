import { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAlbums from './hooks/useAlbums'

async function fetchUsers() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    return response.json()
}

async function fetchAlbums(userID) {
    console.log(userID)
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userID}/albums`
    )
    return response.json()
}

export function Depth() {
    const [currentDepth, setCurrentDepth] = useState(1)
    const [data, setData] = useState(null)
    const [userId, setUserId] = useState('')
    const [selectedItem, setSelectedItem] = useState() //최종선택된 아이템
    const [selectedItems, setSelectedItems] = useState() //뎁스별 선택된 아이템

    //data는 전체 데이터 리스트
    //seletecitem은 선택된 1:2:3: 뎁스별 카테고리 리스트
    const { data: userData, isLoading } = useQuery(
        ['users'],
        () => fetchUsers(),
        {
            staleTime: 5000,
        }
    )
    // const {
    //     data: userDetailData,
    //     isLoading: DetailLoding,
    //     refetch,
    // } = useQuery(['usersDetail'], () => fetchAlbums(currentUser), {
    //     enabled: false,
    // })

    useEffect(() => {
        setData(() => {
            return { 1: userData }
        })
    }, [userData])

    const { data: albumData, refetch } = useQuery(
        ['albums', userId],
        () => fetchAlbums(userId),
        {
            enabled: false,
        }
    )

    useEffect(() => {
        if (userId) {
            refetch()
        }
    }, [userId, refetch])

    useEffect(() => {
        setData((prev) => {
            return { ...prev, [currentDepth]: albumData }
        })
    }, [albumData, currentDepth])

    if (isLoading) return <p>Loading ....</p>

    const handleClickItem = (level, item) => {
        setSelectedItems((prev) => ({ ...prev, [level]: item }))
        setUserId(item.id)
        setCurrentDepth(level + 1)
    }
    //TO DO : data fetch 및 최종 data를 정리하는 hook 로직 개발 필요
    //
    console.log(albumData)
    return (
        <>
            <div>
                {data &&
                    Object.entries(data).map(([key, value]) => (
                        <ul className="menus" key={key}>
                            {value?.map((item) => {
                                return (
                                    <li
                                        className="menu-items"
                                        key={item.id}
                                        id={item.id}
                                        onClick={() => {
                                            handleClickItem(key, item)
                                        }}
                                    >
                                        {item.id}
                                        {item.name}
                                        {item.title && item.title}
                                    </li>
                                )
                            })}
                        </ul>
                    ))}
            </div>
        </>
    )
}

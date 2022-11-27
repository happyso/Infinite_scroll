import { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAlbums from './hooks/useAlbums'

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

const Li = ({ item, setResultData }) => {
    const handleClick = (e, item) => {
        if (e.currentTarget !== e.target) return
        setResultData({
            id: item.id,
            title: item.title,
        })
    }
    return (
        <li
            onClick={(e) => {
                handleClick(e, item)
            }}
        >
            {item.title}
        </li>
    )
}

export function Depth() {
    const [resultData, setResultData] = useState(null)

    const [userId, setUserId] = useState('')

    const [albumList, setAlbumList] = useState([])

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

    const { data: albumData, refetch } = useQuery(
        ['albums', userId],
        () => fetchAlbums(userId),
        {
            enabled: false,
        }
    )

    useEffect(() => {
        console.log(resultData)
    }, [resultData])

    useEffect(() => {
        if (userId) {
            refetch()
        }
    }, [userId, refetch])

    useEffect(() => {
        setAlbumList(
            albumData?.map((item) => (
                <Li key={item.id} item={item} setResultData={setResultData} />
            ))
        )
    }, [albumData])

    if (isLoading) return <p>Loading ....</p>

    const handleClickItem = (item) => {
        //setSelectedItems((prev) => ({ ...prev, [level]: item }))
        setUserId(item.id)
    }
    //TO DO : data fetch 및 최종 data를 정리하는 hook 로직 개발 필요
    //

    return (
        <>
            <ul>
                {userData &&
                    userData?.map((item) => {
                        return (
                            <li
                                className="menu-items"
                                key={item.id}
                                id={item.id}
                                onClick={() => {
                                    handleClickItem(item)
                                }}
                            >
                                {item.id} : {item.name}
                                <ul>{item.id === userId && albumList}</ul>
                            </li>
                        )
                    })}
            </ul>
        </>
    )
}

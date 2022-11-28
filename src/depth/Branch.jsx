import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export function Branch({ data, level }) {
    const [queryId, setQueryId] = useState(0)

    return level === 1 && level === 2 ? (
        <RadioGroup label={level} value={queryId} onChange={setQueryId}>
            {data &&
                data.map((item) => {
                    return (
                        <Radio
                            key={item.id}
                            value={item.id}
                            style={{ display: 'block' }}
                            name={level}
                        >
                            {item.title && item.title}
                            {item.name && item.name}

                            {Number(queryId) === item.id && (
                                <Branch id={queryId} depth={level + 1} />
                            )}
                        </Radio>
                    )
                })}
        </RadioGroup>
    ) : (
        <RadioGroup label={level} value={queryId} onChange={setQueryId}>
            {data &&
                data.map((item) => {
                    return (
                        <Radio
                            key={item.id}
                            value={item.id}
                            style={{ display: 'block' }}
                            name={level}
                        >
                            {item.title}
                        </Radio>
                    )
                })}
        </RadioGroup>
    )
}

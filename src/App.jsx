import './App.css'
import { InfinitePeople } from './people/InfinitePeople'
import { InfiniteSpecies } from './species/InfiniteSpecies'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import RadioGroup from './RadioGroup'
import Radio from './Radio'
import Home from './Home'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
})

function App() {
    const [value, setValue] = useState('people')

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Infinite SWAPI</h1>
                <RadioGroup label="선택 하기" value={value} onChange={setValue}>
                    <Radio
                        value="people"
                        name="swapi"
                        style={{ display: 'block' }}
                    >
                        사람
                    </Radio>
                    <Radio
                        value="species"
                        name="swapi"
                        style={{ display: 'block' }}
                    >
                        종류
                    </Radio>
                </RadioGroup>
                <Home value={value}></Home>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App

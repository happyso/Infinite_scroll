import { RadioContext } from './RadioContext'

export default function RadioGroup({ label, children, ...others }) {
    return (
        <fieldset>
            <legend>{label}</legend>
            <RadioContext.Provider value={others}>
                {children}
            </RadioContext.Provider>
        </fieldset>
    )
}

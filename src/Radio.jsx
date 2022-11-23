import { useContext } from 'react'
import { RadioContext } from './RadioContext'

export default function Radio({
    children,
    value,
    name,
    defaultChecked,
    disabled,
    style,
}) {
    const group = useContext(RadioContext)
    const handleChange = (e) => group.onChange && group.onChange(e.target.value)

    return (
        <label style={style}>
            <input
                type="radio"
                value={value}
                name={name}
                defaultChecked={defaultChecked}
                disabled={disabled || group.disabled}
                checked={
                    group.value !== undefined
                        ? value === group.value
                        : undefined
                }
                onChange={handleChange}
            />
            {children}
        </label>
    )
}

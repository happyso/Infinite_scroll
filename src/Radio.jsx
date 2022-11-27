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
    const handleChange = (e) => {
        return group.onChange && group.onChange(e.target.value)
    }

    return (
        <label style={style}>
            <input
                type="radio"
                value={value}
                name={name}
                defaultChecked={defaultChecked}
                disabled={disabled || group.disabled}
                checked={
                    Number(group.value) !== undefined
                        ? value === Number(group.value)
                        : undefined
                }
                onChange={handleChange}
            />
            {children}
        </label>
    )
}

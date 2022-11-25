export function Person({ name, hairColor, eyeColor }) {
    return (
        <li className="item">
            {name}
            <ul className="info">
                <li>hair: {hairColor}</li>
                <li>eyes: {eyeColor}</li>
            </ul>
        </li>
    )
}

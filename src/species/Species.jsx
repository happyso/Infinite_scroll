export function Species({ name, language, averageLifespan }) {
    return (
        <li className="item">
            {name}
            <ul className="info">
                <li>language: {language}</li>
                <li>average lifespan: {averageLifespan}</li>
            </ul>
        </li>
    )
}

import './Skeleton.css'

import React from 'react'

export default function Skeleton() {
    return new Array(10).fill(1).map((_, i) => {
        return (
            <li className="skeleton-item" key={i}>
                <ul className="skeleton-info">
                    <li className="skeleton-name"></li>
                    <li className="skeleton-email"></li>
                </ul>
            </li>
        )
    })
}

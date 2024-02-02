'use client'

import React from "react";

const AccessLog = (props: { page_id: string }) => {
    React.useEffect(() => {
        fetch('/api/access/' + props.page_id, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    })
    return <></>
}

export default AccessLog

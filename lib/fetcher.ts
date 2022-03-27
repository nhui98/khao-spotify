export default function fetcher(url: string, data = undefined) {
    return fetch(`${window.location.origin}/api${url}`,
        {
            method: data ? 'POST' : 'GET',
            credentials: 'include', // send cookies up for jwt
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // setting data to undefined wont cause an error, a null value for data will
        }
    )
}
const graphqlURL = 'https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql';

export async function graphqlQuery(query, variables = {}) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        console.error('No JWT found');
        // Redirect to login or handle error
        return;
    }

    const response = await fetch(graphqlURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 401) { // Unauthorized
            localStorage.removeItem('jwt');
            window.location.href = 'index.html'; // Or trigger a logout function
        }
        throw new Error(`GraphQL request failed: ${errorBody.message || response.statusText}`);
    }

    return await response.json();
}

export const api = {}
api.$baseUrl = null

const jsonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

api.$fetch = async (method, endpoint, queryParams = {}, body = null, headers = {}) => {
    if (api.$baseUrl === null) {
        throw new Error('baseUrl not set')
    }
    const url = new URL(api.$baseUrl.replace(/\/$/, '') + '/' + endpoint.replace(/^\//, ''))
    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] !== undefined) {
            url.searchParams.append(key, queryParams[key])
        }
    })
    const config = {
        method,
        headers: { ...api.$headers, ...headers },
        body: body ? JSON.stringify(body) : null,
    }
    const response = await fetch(url, config)
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorBody}`);
    }
    return response.json()
}

api.$service = 'nvfxbesbgohafwkbhsvv'
api.$provider = 'Supabase'
api.$description = 'Provides access to posts and reactions data.'

api.$init = ({ baseUrl, anonKey }) => {
    api.$baseUrl = baseUrl
    api.$headers = {
        ...jsonHeaders,
        'Authorization': `Bearer ${anonKey}`,
        'apikey': `${anonKey}`,
    }
}

api.reactions = {}

api.reactions.list = async ({ id, postId, userId, emoji, select, order, range, rangeUnit, offset, limit, preferCount } = {}) => {
    return api.$fetch('GET', `/reactions`, { id, post_id: postId, user_id: userId, emoji, select, order, range, range_unit: rangeUnit, offset, limit, prefer: preferCount })
}

api.reactions.create = async ({ reaction, select, preferPost } = {}) => {
    return api.$fetch('POST', `/reactions`, {}, reaction, { Prefer: preferPost, select })
}

api.reactions.delete = async ({ id, postId, userId, emoji, preferReturn } = {}) => {
    return api.$fetch('DELETE', `/reactions`, { id, post_id: postId, user_id: userId, emoji, prefer: preferReturn })
}

api.reactions.update = async ({ id, postId, userId, emoji, reaction, preferReturn } = {}) => {
    return api.$fetch('PATCH', `/reactions`, { id, post_id: postId, user_id: userId, emoji }, reaction, { Prefer: preferReturn })
}

api.posts = {}

api.posts.list = async ({ id, title, body, createdAt, authorId, select, order, range, rangeUnit, offset, limit, preferCount } = {}) => {
    return api.$fetch('GET', `/posts`, { id, title, body, created_at: createdAt, author_id: authorId, select, order, range, range_unit: rangeUnit, offset, limit, prefer: preferCount })
}

api.posts.create = async ({ post, select, preferPost } = {}) => {
    return api.$fetch('POST', `/posts`, {}, post, { Prefer: preferPost, select })
}

api.posts.delete = async ({ id, title, body, createdAt, authorId, preferReturn } = {}) => {
    return api.$fetch('DELETE', `/posts`, { id, title, body, created_at: createdAt, author_id: authorId, prefer: preferReturn })
}

api.posts.update = async ({ id, title, body, createdAt, authorId, post, preferReturn } = {}) => {
    return api.$fetch('PATCH', `/posts`, { id, title, body, created_at: createdAt, author_id: authorId }, post, { Prefer: preferReturn })
}

export const example = async (BASE_URL, API_KEY) => {
    api.$init({ baseUrl: BASE_URL, anonKey: API_KEY })

    const reactions = await api.reactions.list({ postId: 1 })
    console.log(reactions) // [{id: 1, post_id: 1, user_id: 'uuid', emoji: '😊'}, ...]

    const posts = await api.posts.list({ authorId: 'uuid' })
    console.log(posts) // [{id: 1, title: 'Hello', body: 'World', author_id: 'uuid', created_at: 'timestamp'}, ...]
}

export const example_public = async (BASE_URL, API_KEY) => {
    api.$init({ baseUrl: BASE_URL, anonKey: API_KEY })

    const posts = await api.posts.list({})
    return posts // [{id: 1, title: 'Hello', body: 'World', author_id: 'uuid', created_at: 'timestamp'}, ...]
}

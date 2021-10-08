export const cleanParam = searchParam => {
    return searchParam.split('&').map(s => {
        const keyValPair = s.split('=').map(s => {
            if (s[0] === '?') return s.slice(1)
            else return s
        })
        return { param: keyValPair[0], query: keyValPair[1] }
    })
}

export const filterList = (data, params) => {
    return data.slice().filter(ld => {
        const someres = params.every(cp => {
            if (ld[cp.param].toLowerCase().startsWith(decodeURI(cp.query).toLowerCase())) return true;
        })

        return someres
    })
}

export const onFieldFilter = (event, search, fieldName) => {
    const filter = event.currentTarget.value?.trim().length > 0 ? event.currentTarget.value : ''
    const searchCleaned = cleanParam(search).filter(s => s.param !== fieldName)
    return {
        pathname: '',
        searchResult: `${filter.trim().length > 0 ?
            `${searchCleaned.map(({ param, query }) => {
                if (param && query) return `${param}=${query}${searchCleaned.length === 1 ? '&' : ''}`;
            }).join('&')}${searchCleaned.length > 1 ? '&' : ''}${fieldName}=${event.currentTarget.value}`
            : `${searchCleaned.map(({ param, query }) => { if (param && query) return `${param}=${query}`; }).join('&')}`}`,
    }
}
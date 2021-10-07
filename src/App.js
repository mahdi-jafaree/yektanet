import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './App.css';
import { Datatable } from './components/datatable';
import { HeaderInput } from './components/headerInput';
import data from './data.json';

function App() {
  const history = useHistory()
  const location = useLocation()
  const [listData, setListData] = useState([])
  const { search } = location
  const [loading, setLoading] = useState(false)
  const cleanParam = searchParam => {
    return searchParam.split('&').map(s => {
      const keyValPair = s.split('=').map(s => {
        if (s[0] === '?') return s.slice(1)
        else return s
      })
      return { param: keyValPair[0], query: keyValPair[1] }
    })
  }

  useEffect(() => {
    if (search?.trim().length > 0) {
      setLoading(true)
      setTimeout(() => {
        const cleanedParams = cleanParam(search)

        const filtered = data.slice().filter(ld => {
          const someres = cleanedParams.every(cp => {
            if (ld[cp.param].toLowerCase().startsWith(decodeURI(cp.query).toLowerCase())) return true;
          })

          return someres
        })
        setListData(filtered)
        setLoading(false)
      }, 700)

    } else {
      setListData([])
    }

  }, [search])


  const onNameFilter = event => {
    const filter = event.currentTarget.value?.trim().length > 0 ? event.currentTarget.value : ''
    const searchCleaned = cleanParam(search).filter(s => s.param !== 'name')
    history.replace({
      pathname: '',
      search: `${filter.trim().length > 0 ? `${searchCleaned.map(({ param, query }) => { if (param && query) return `${param}=${query}&`; }).join('&')}name=${event.currentTarget.value}` : `${searchCleaned.map(({ param, query }) => { if (param && query) return `${param}=${query}`; }).join('&')}`}`,
    })

  }
  const onFiledFilter = event => {
    const filter = event.currentTarget.value?.trim().length > 0 ? event.currentTarget.value : ''
    const searchCleaned = cleanParam(search).filter(s => s.param !== 'field')
    history.replace({
      pathname: '',
      search: `${filter.trim().length > 0 ? `${searchCleaned.map(({ param, query }) => { if (param && query) return `${param}=${query}&`; }).join('&')}field=${event.currentTarget.value}` : `${searchCleaned.map(({ param, query }) => { if (param && query) return `${param}=${query}`; }).join('&')}`}`
    })
  }
  const dtHeader = <div className="flex" >
    <HeaderInput onInputChange={onNameFilter} className="flex-1" title={"نام تغییر دهنده"} />
    <HeaderInput className="flex-1" title={"تاریخ"} />
    <HeaderInput className="flex-1" title={"نام آگهی"} />
    <HeaderInput className="flex-1" onInputChange={onFiledFilter} title={"فیلد"} />

  </div>
  return (
    <div className="container mx-auto">
      <div className="w-full bg-gray p-4">
        <Datatable loading={loading} header={dtHeader} values={listData.slice()} />
      </div>
    </div>
  );
}

export default App;

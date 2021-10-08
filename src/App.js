import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './App.css';
import {Datatable} from './components/datatable';
import { HeaderInput } from './components/headerInput';
import data from './data.json';
import { cleanParam, filterList, onFieldFilter } from './utils/filter';
function App() {
  const history = useHistory()
  const location = useLocation()
  const [listData, setListData] = useState(data.slice(0, 1000))
  const { search } = location
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (search?.trim().length > 0) {
      setLoading(true)
      setTimeout(() => {
        const cleanedParams = cleanParam(decodeURI(search))
        const filtered = filterList(data.slice(0, 1000), cleanedParams)
        setListData(filtered)
        setLoading(false)
      }, 1)

    } else {
      setListData(data.slice(0, 1000))
    }

  }, [search])


  const onNameFilter = event => {
    const { pathname, searchResult } = onFieldFilter(event, search, 'name')
    history.replace({ pathname, search: searchResult })
  }
  const onDataFieldFilter = event => {
    const { pathname, searchResult } = onFieldFilter(event, search, 'field')
    history.replace({ pathname, search: searchResult })
  }
  const onTitleFilter = event => {
    const { pathname, searchResult } = onFieldFilter(event, search, 'title')
    history.replace({ pathname, search: searchResult })
  }

  const dtHeader = <div className="flex" >
    <HeaderInput onInputChange={onNameFilter} className="flex-1" title={"نام تغییر دهنده"} />
    <HeaderInput className="flex-1" title={"تاریخ"} />
    <HeaderInput className="flex-1" onInputChange={onTitleFilter} title={"نام آگهی"} />
    <HeaderInput className="flex-1" onInputChange={onDataFieldFilter} title={"فیلد"} />

  </div>
  return (
    <div className="container mx-auto">
      <div className="w-full bg-gray p-4">
        <Datatable loading={loading} header={dtHeader} values={listData} />
      </div>
    </div>
  );
}

export default App;

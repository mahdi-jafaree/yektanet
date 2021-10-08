import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'

export const Datatable = ({ values, header, loading }) => {

    const stars = JSON.parse(localStorage.getItem('stars'))
    const [valuesData, setValuesData] = useState(values)

    useEffect(() => {
        setValuesData(values)
    }, [values])

    const [asc, setAsc] = useState(true)
    const onStar = rowData => {
        if (!stars)
            localStorage.setItem('stars', JSON.stringify([rowData.id]))
        else {
            stars.push(rowData.id)
            localStorage.setItem('stars', JSON.stringify(stars.slice()))
        }
    }

    const sortByFieldAscending = (field) => {
        const _tmp = valuesData;
        _tmp.sort((a, b) => (a[field] + "").toLowerCase() > (b[field] + "").toLowerCase() ? 1 : -1)
        setValuesData(_tmp)
    }
    const sortByFieldDescending = (field) => {
        const _tmp = valuesData;
        _tmp.sort((a, b) => (a[field] + "").toLowerCase() > (b[field] + "").toLowerCase() ? -1 : 1)
        setValuesData(_tmp)
    }
    const onSortByField = (field) => {
        if (asc) {
            sortByFieldAscending(field);
            setAsc(!asc)
        } else {
            sortByFieldDescending(field)
            setAsc(!asc)
        }
    }
    return (
        <>
            {header &&
                <div>
                    {header}
                </div>}
            <table className="w-full mt-2 datatable" >
                <thead className="bg-alabaster">
                    <tr>
                        <th
                            onClick={() => onSortByField('name')}
                            className="py-2">نام تغییر دهنده</th>
                        <th
                            onClick={() => onSortByField('date')}
                            className="py-2">تاریخ</th>
                        <th
                            onClick={() => onSortByField('title')}
                            className="py-2">نام آگهی</th>
                        <th
                            onClick={() => onSortByField('field')}
                            className="py-2">فیلد</th>
                        <th
                            onClick={() => onSortByField('old_value')}
                            className="py-2">مقدار قدیمی</th>
                        <th
                            onClick={() => onSortByField('new_value')}
                            className="py-2">مقدار جدید</th>
                        <th className="py-2">ستاره</th>
                    </tr>
                </thead>
                <tbody>{loading ? <tr className="text-center"><td colSpan={6} >loading</td></tr> :
                    <>
                        {valuesData.map(row => <tr className={stars?.includes(row.id) ? 'bg-yellow' : ''} key={row.id}>
                            <td className="p-1" >{row.name}</td>
                            <td className="p-1" >{row.date}</td>
                            <td className="p-1" >{row.title}</td>
                            <td className="p-1" >{row.field}</td>
                            <td className="p-1" >{row.old_value}</td>
                            <td className="p-1" >{row.new_value}</td>
                            <td className="p-1" ><button className="start-button py-1 px-3" onClick={e => onStar(row)} >ستاره</button></td>
                        </tr>)}
                    </>
                }
                </tbody>
            </table>
        </>
    )
}

import React from 'react'
import { useState } from 'react/cjs/react.development'

export const Datatable = ({ values, header, loading }) => {

    const stars = JSON.parse(localStorage.getItem('stars'))
    const [state, setState] = useState()
    const onStar = rowData => {
        setState(rowData)
        if (!stars)
            localStorage.setItem('stars', JSON.stringify([rowData.id]))
        else {
            stars.push(rowData.id)
            localStorage.setItem('stars', JSON.stringify(stars.slice()))
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
                        <th className="py-2">نام تغییر دهنده</th>
                        <th className="py-2">تاریخ</th>
                        <th className="py-2">نام آگهی</th>
                        <th className="py-2">فیلد</th>
                        <th className="py-2">مقدار قدیمی</th>
                        <th className="py-2">مقدار جدید</th>
                        <th className="py-2">ستاره</th>
                    </tr>
                </thead>
                <tbody>{loading ? <tr className="text-center"><td colSpan={6} >loading</td></tr> :
                    <>
                        {values.slice().map(row => <tr className={stars?.includes(row.id) ? 'bg-yellow' : ''} key={row.id}>
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

import React from 'react'

export const Datatable = ({ values, header, loading }) => {
    return (
        <>
            {header &&
                <div>
                    {header}
                </div>}
            <table className="w-full mt-2 datatable" >
                <thead className="bg-alabaster">
                    <tr>
                        <th>نام تغییر دهنده</th>
                        <th>تاریخ</th>
                        <th>نام آگهی</th>
                        <th>فیلد</th>
                        <th>مقدار قدیمی</th>
                        <th>مقدار جدید</th>
                    </tr>
                </thead>
                {loading ? <p className="text-center">loading</p> : <tbody>
                    {values.slice().map(row => <tr key={row.id}>
                        <td className="p-1" >{row.name}</td>
                        <td className="p-1" >{row.date}</td>
                        <td className="p-1" >{row.title}</td>
                        <td className="p-1" >{row.field}</td>
                        <td className="p-1" >{row.old_value}</td>
                        <td className="p-1" >{row.new_value}</td>
                    </tr>)}
                </tbody>}
            </table>
        </>
    )
}

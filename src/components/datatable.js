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
                        <th className="py-2">نام تغییر دهنده</th>
                        <th className="py-2">تاریخ</th>
                        <th className="py-2">نام آگهی</th>
                        <th className="py-2">فیلد</th>
                        <th className="py-2">مقدار قدیمی</th>
                        <th className="py-2">مقدار جدید</th>
                    </tr>
                </thead>
                <tbody>{loading ? <tr className="text-center"><td colSpan={6} >loading</td></tr> :
                    <>
                        {values.slice().map(row => <tr key={row.id}>
                            <td className="p-1" >{row.name}</td>
                            <td className="p-1" >{row.date}</td>
                            <td className="p-1" >{row.title}</td>
                            <td className="p-1" >{row.field}</td>
                            <td className="p-1" >{row.old_value}</td>
                            <td className="p-1" >{row.new_value}</td>
                        </tr>)}
                    </>
                }
                </tbody>
            </table>
        </>
    )
}

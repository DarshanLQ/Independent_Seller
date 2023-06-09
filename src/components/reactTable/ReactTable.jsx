import React, { useMemo, useState, useEffect, useRef } from 'react'
import './ReactTable.css'
import { itemsData } from './data'
import { SortLDID, SortCert } from '../OwnerTable/sortFn'
import {
    useReactTable, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import InnerTable from '../innerTable/InnerTable'
import Filter from '../Filter/Filter'

const ReactTable = () => {

    const [columns, setColumns] = useState()
    const [itemData, setItemData] = useState()
    const [sorting, setSorting] = useState()



    const columnHelper = createColumnHelper()

    const itemsToBeRemoved = [
        'LD ID', 'LD ID Url', "Cert Num", "Cert Num Url",
        'Use Item 1 ID', 'Use Item 1 ID Url', 'Use Item 2 ID Url', 'Use Item 3 ID Url', 'Use Item 2 ID', 'Use Item 3 ID',
        'Video', 'Video Url', 'Img1', 'Img1 Url', 'Img2', 'Img2 Url', 'Img3', 'Img3 Url', 'Img4', 'Img4 Url'
    ]

    const itemsToBeMerged = {
        'LD ID': 'LD ID Url',
        "Cert Num": "Cert Num Url",
        'Use Item 1 ID': "Use Item 1 ID Url",
        'Use Item 2 ID': "Use Item 2 ID Url",
        'Use Item 3 ID': "Use Item 3 ID Url",
        'Video': "Video Url",
        'Img1': "Img1 Url",
        'Img2': "Img2 Url",
        'Img3': "Img3 Url",
        "Img4": "Img4 Url"
    }


    const checkLink = (str) => {

        if (typeof str === 'string') {
            if (str.includes("http")) {
                return true
            } else {
                return false
            }
        }

        return false
    }

    const globalFilter = React.useCallback((rows, ids, query) => {
        const searchTerm = String(query);

        return rows.filter((row) => {
            const matches = ids.filter((id) => {
                const rowValue = row.values[id];
                let searchTermLower = searchTerm.toLowerCase();

                if (searchTerm == '"') {
                    // ignore first ' " ' handle it as no input
                    return true
                }
                else if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
                    const exactSearchTerm = searchTerm.slice(1, -1);
                    return String(rowValue) === exactSearchTerm;
                }
                else if (searchTerm.startsWith('"')) {
                    // ignore until ending ' " ' has been entered
                    searchTermLower = searchTerm.slice(1);
                }

                return rowValue !== undefined
                    ? String(rowValue).toLowerCase().includes(searchTermLower.toLowerCase())
                    : false;
            });

            return matches.length > 0;
        });
    }, []);

    const generateColumns = (data) => {

        const columns = [

        ]

        const item = data[0]
        for (const [key, value] of Object.entries(item)) {
            if (!itemsToBeRemoved.includes(key)) {


                columns.push(columnHelper.accessor(key, {
                    filterFn: "equals",
                    id: key,
                    enableColumnFilter: true,

                    cell: ({ row, getValue }) => (
                        <div style={{ cursor: 'pointer' }}>

                            {getValue()}
                        </div >

                    ),
                    footer: item => item.getValue()


                }))
            }

            else {
                if (!key.includes("Url")) {

                    function exactMatchFilter(rows, id, filterValue) {
                        return rows.filter(row => {
                            const rowValue = row.values[id]
                            return (rowValue === filterValue || !filterValue)
                        })
                    }

                    columns.push(columnHelper.accessor(key, {
                        // filterFn: exactMatchFilter,


                        cell: item => {


                            return <a href={item.row.original[itemsToBeMerged[key]]} onClick={(e) => { item.row.toggleExpanded() }} >
                                {
                                    item.getValue()
                                }
                            </a>
                        },
                        footer: item => item.getValue(),
                        sortingFn: (rowA, rowB, id, desc) => {


                            let a, b;

                            if (key == "LD ID") {
                                a = parseInt(rowA.original[id])
                                b = parseInt(rowB.original[id])
                            }

                            if (key == "Cert Num") {
                                a = parseInt(rowA.original[id])
                                b = parseInt(rowB.original[id])
                            }

                            if (a > b) return 1;
                            if (b > a) return -1;
                            return 0;
                        }


                    }))

                }
            }
        }

        setColumns(columns)


    }

    const parentDivRef = useRef()

    useEffect(() => {

        (async () => {
            // call the fetch request for the table data here.


            generateColumns(itemsData.data)
            setItemData(itemsData.data)
        })()
    }, [])


    const table = useReactTable({
        data: itemData, columns, getCoreRowModel: getCoreRowModel(), state: {
            sorting
        }, onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // enableColumnResizing: true,
        // columnResizeMode: 'onChange',
        // globalFilterFn: globalFilter,
        debugTable: true
    })

    return (
        <>{
            columns && itemData ?
                <div style={{ height: "100%", width: "100%" }} ref={parentDivRef}>
                    <div className="p-2">


                        <table>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} style={{ backgroundColor: "#8d8d8d" }}>
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <th key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                            <div
                                                                {...{
                                                                    className: header.column.getCanSort()
                                                                        ? 'cursor-pointer select-none'
                                                                        : '',
                                                                    onClick: header.column.getToggleSortingHandler(),
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                                {{
                                                                    asc: ' 🔼',
                                                                    desc: ' 🔽',
                                                                }[header.column.getIsSorted()] ?? null}


                                                            </div>
                                                            {header.column.getCanFilter() ? (
                                                                <div>
                                                                    <Filter column={header.column} table={table} />
                                                                </div>
                                                            ) : null}</>
                                                    )}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, idx) => (
                                    <>
                                        <tr key={row.id} onClick={() => row.toggleExpanded()} style={{ cursor: 'pointer', backgroundColor: idx % 2 == 0 ? "#d0d5d0" : "white" }}>
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                        {
                                            row.getIsExpanded() && (
                                                <tr>

                                                    <td colSpan={row.getVisibleCells().length}>
                                                        {<InnerTable parentRef={parentDivRef} data={row.original} />}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </>
                                ))}
                            </tbody>

                        </table>
                        {/* {
                        table.getRowModel()
                    } */}
                        <div className="flex items-center gap-2">
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>'}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </button>
                            <span className="flex items-center gap-1">
                                <div>Page</div>
                                <strong>
                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1">
                                | Go to page:
                                <input
                                    type="number"
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    onChange={e => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        table.setPageIndex(page)
                                    }}
                                    className="border p-1 rounded w-16"
                                />
                            </span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div> : ""
        }</>
    )
}

export default ReactTable




// Textbox = Cert Number,
// MultiSelect Dropdown = shape, LD spec, color, clarity, Cut, Polish, Sym, FLor, Shad, mily, lab
// From - To =  carat wt, price, rank , count, sales, aging, inv count


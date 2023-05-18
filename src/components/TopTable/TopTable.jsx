import React, { useEffect, useState } from 'react'
import {
    useReactTable, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import './TopTable.css'



const TopTable = ({ setItem, passRef }) => {
    // const [columns, setColumns] = useState()
    const [itemData, setItemData] = useState()
    const [sorting, setSorting] = useState()
    const [intItem, setIntItem] = useState()

    const columnHelper = createColumnHelper()

    const columns = React.useMemo(() => [
        columnHelper.accessor("Cert Num", {
            id: "Cert Num",
            cell: item => {


                return <a href={item.row.original["Cert Num Url"]}  >
                    {
                        item.getValue()
                    }
                </a>
            },
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Shape", {
            id: "Shape",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Carats", {
            id: "Carats",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("LD Spec", {
            id: "LD Spec",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Color", {
            id: "Color",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Clarity", {
            id: "Clarity",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Cut", {
            id: "Cut",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Polish", {
            id: "Polish",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Sym", {
            id: "Sym",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Flour", {
            id: "Flour",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Shade", {
            id: "Shade",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Milky", {
            id: "Milky",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Lab", {
            id: "Lab",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Eye Clean", {
            id: "Eye Clean",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("BIC", {
            id: "BIC",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Rap $/Ct", {
            id: "Rap $/Ct",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("$/Ct", {
            id: "$/Ct",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Total Price", {
            id: "Total Price",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.group({
            id: "Rap",
            header: 'Rap',

            columns: [
                columnHelper.accessor("Rap Rank", {
                    id: "Rap Rank",
                    header: "Rank",
                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("Count", {
                    id: "Count",
                    header: "Count",
                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("1st Rap %", {
                    id: "1st Rap %",
                    header: "1st",

                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("5th Rap %", {
                    id: "5th Rap %",
                    header: "5th",

                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("25th Rap %", {
                    id: "25th Rap %",
                    header: "25th",

                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("50th Rap %", {
                    id: "50th Rap %",
                    header: "50th",

                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("100th Rap %", {
                    id: "100th Rap %",
                    header: "100th",

                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
            ]
        }),
        columnHelper.group({
            id: "Inv",
            header: "Your Inventory",
            columns: [
                columnHelper.accessor("LD Rank", {
                    id: "LD Rank",
                    header: "Rank",
                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("LD Count", {
                    id: "LD Count",
                    header: "Count",
                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
                columnHelper.accessor("aging", {
                    id: "Aging",
                    header: "Aging",
                    cell: ({ row, getValue }) => getValue(),
                    footer: item => item.getValue()
                }),
            ]
        }),
        columnHelper.accessor("Video", {
            id: "Video",
            header: "Video",
            cell: item => {
                return <a href={item.row.original["Video Url"]}  >
                    {
                        item.getValue()
                    }
                </a>
            },
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Measurements", {
            id: "Measurements",
            header: "Measurements",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Table", {
            id: "Table",
            header: "Table",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Depth", {
            id: "Depth",
            header: "Depth",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Key To Symbol", {
            id: "Key To Symbol",
            header: "Key To Symbol",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Cert Comment", {
            id: "Cert Comment",
            header: "Cert Comments",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Girdle", {
            id: "Girdle",
            header: "Girdle",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("CrAng", {
            id: "CrAng",
            header: "CrAng",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("CrHeight", {
            id: "CrHeight",
            header: "CrHeight",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("PavAng", {
            id: "PavAng",
            header: "PavAng",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("PavDepth", {
            id: "PavDepth",
            header: "PavDepth",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Girdle Con", {
            id: "Girdle Con",
            header: "Girdle Con",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Culet", {
            id: "Culet",
            header: "Culet",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("BIS", {
            id: "BIS",
            header: "BIS",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("WIS", {
            id: "WIS",
            header: "WIS",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("WIC", {
            id: "WIC",
            header: "WIC",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("OT", {
            id: "OT",
            header: "OT",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("OC", {
            id: "OC",
            header: "OC",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("OP", {
            id: "OP",
            header: "OP",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Flr Clr", {
            id: "Flr Clr",
            header: "Flr Clr",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Location", {
            id: "Location",
            header: "Location",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Report Date", {
            id: "Report Date",
            header: "Report Date",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Ratio", {
            id: "Ratio",
            header: "Ratio",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Carat Range", {
            id: "Carat Range",
            header: "Carat Range",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),

    ], [])

    useEffect(() => {

        (async () => {
            // call  the fetch request for the table data here.

            let id = 5

            let x = await fetch(`https://app.liquid.diamonds/get_pricing_report_items?seller_account_id=${id}`, {
                headers: {
                    "Authorization": "Bearer d18198f276acab345ab6f3302b5a37a4"
                }
            });

            const { data } = await x.json()
            setItemData(data.pricing_report_items)
        })()
    }, [])

    const table = useReactTable({
        data: itemData, columns, getCoreRowModel: getCoreRowModel(),

        state: {
            sorting,

        }, onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // getExpandedRowModel: getExpandedRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        // enableColumnResizing: true,
        // columnResizeMode: 'onChange',
        // globalFilterFn: globalFilter,
        debugTable: true
    })

    useEffect(() => {
        table.setPageSize("25")
    }, [])

    const calucateCurrentItems = () => {

        let totalItems = itemData.length

        let currentPage = table.getState().pagination.pageIndex
        let rowCount = table.getState().pagination.pageSize

        let rangeStart = (currentPage * rowCount) + 1
        let rangeEnd = rangeStart + rowCount

        if (rangeEnd > totalItems) {
            rangeEnd = totalItems
        }

        return `Showing ${rangeStart} - ${rangeEnd} out of ${totalItems} items`
    }

    return (
        <>
            {
                itemData ? <div style={{ overflow: "hidden", height: "100%", display: 'flex', flexDirection: "column" }}>

                    <div className='pagination-controls' >
                        <div>
                            {
                                calucateCurrentItems()
                            }
                        </div>
                        <div style={{ fontWeight: "bold" }}> Matching Items</div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                            <span style={{ margin: "0px 5px" }}>

                                <div>
                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </div>
                            </span>
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
                        </div>


                    </div>
                    <div style={{ overflow: "scroll", height: "100%" }} ref={passRef}>
                        <table >
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id + Math.random()} style={{ backgroundColor: "#374ac4", color: "white" }}>
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
                                                        </>
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
                                        <tr key={row.id} onClick={() => {
                                            setItem(row.original)
                                            setIntItem(row.original)
                                            console.log(row.original)
                                        }} style={{
                                            cursor: 'pointer', backgroundColor: intItem ?
                                                row.original["LD ID"] === intItem["LD ID"] ? "#bde0ff" : "white" : "white"
                                        }}>
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    </>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div> : null
            }
        </>
    )
}

export default TopTable
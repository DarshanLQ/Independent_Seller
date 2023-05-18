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




const BottomTable = ({ rowData, passRef, scroll }) => {
    // const [columns, setColumns] = useState()
    const [itemData, setItemData] = useState()
    const [sorting, setSorting] = useState()

    const columnHelper = createColumnHelper()

    const columns = React.useMemo(() => [
        columnHelper.accessor("certificate #", {
            id: "Cert Num",
            header: "Cert Num",
            cell: item => {


                return <a href={item.row.original["cert url"]}  >
                    {
                        item.getValue()
                    }
                </a>
            },
            footer: item => item.getValue()
        }),
        columnHelper.accessor("shape", {
            id: "shape",
            header: "Shape",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("carat", {
            id: "Carats",
            header: "Carat",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("LD Spec", {
            id: "LD Spec",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("color", {
            id: "Color",
            header: "Color",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("clarity", {
            id: "Clarity",
            header: "Clarity",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("cut", {
            id: "Cut",
            header: "Cut",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("polish", {
            id: "Polish",
            header: "Polish",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("symmetry", {
            id: "Sym",
            header: "Sym",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("fluor", {
            id: "Flour",
            header: "Flour",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("shade", {
            id: "Shade",
            header: "Shade",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("milky", {
            id: "Milky",
            header: "Milky",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("lab", {
            id: "Lab",
            header: "Lab",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("eyeclean", {
            id: "Eye Clean",
            header: "Eye Clean",

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
        columnHelper.accessor("price_per_carat", {
            id: "$/Ct",
            header: "$/Ct",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("total_price", {
            id: "Total Price",
            header: "Total Price",

            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Rap Rank", {
            id: "Rap Rank",
            header: "Rank",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("Stock No", {
            id: "Stock No",
            header: "Supplier",
            cell: ({ row, getValue }) => {

                let x = getValue()

                let y = x.split("|")[0]

                return y
            },
            footer: item => item.getValue()
        }),
        columnHelper.accessor("member comment", {
            id: "LD Rank",
            header: "Supplier Comment",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("videolink", {
            id: "Video",
            header: "Video",
            cell: item => {
                return <a href={item.row.original["videolink"]}  >
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
        columnHelper.accessor("table %", {
            id: "Table",
            header: "Table",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("depth %", {
            id: "Depth",
            header: "Depth",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("key to symbols", {
            id: "Key To Symbol",
            header: "Key To Symbol",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("cert comment", {
            id: "Cert Comment",
            header: "Cert Comments",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("girdle min", {
            id: "Girdle",
            header: "Girdle",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("CA", {
            id: "CrAng",
            header: "CrAng",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("CH", {
            id: "CrHeight",
            header: "CrHeight",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("PA", {
            id: "PavAng",
            header: "PavAng",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("PD", {
            id: "PavDepth",
            header: "PavDepth",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("girdle condition", {
            id: "Girdle Con",
            header: "Girdle Con",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("culet size", {
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
        columnHelper.accessor("fluor color", {
            id: "Flr Clr",
            header: "Flr Clr",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("country", {
            id: "Location",
            header: "Location",
            cell: ({ row, getValue }) => getValue(),
            footer: item => item.getValue()
        }),
        columnHelper.accessor("report date", {
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
            // call the fetch request for the table data here.
            setItemData(null)
            let x = await fetch(`https://app.liquid.diamonds/get_rapnet_matching_items_for_item?item_id=${rowData["LD ID"]}`, {
                headers: {
                    "Authorization": "Bearer d18198f276acab345ab6f3302b5a37a4"
                }
            });

            const { data } = await x.json()
            console.log(data)


            setItemData(data)
        })()
    }, [rowData])

    const table = useReactTable({
        data: itemData, columns, getCoreRowModel: getCoreRowModel(),

        state: {
            sorting
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
        table.setPageSize(25)
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

                    <div className='pagination-controls'>
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
                    <div style={{ height: "100%", width: "100%", overflow: "auto", boxSizing: "border-box" }} ref={passRef} onScroll={scroll}>
                        <table >
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id + Math.random()} style={{ backgroundColor: "#8d8d8d" }}>
                                        {headerGroup.headers.map(header => {

                                            // TODO:  color set should be here 
                                            // write a function based on header.column.id and set with a switch statement
                                            return (
                                                <th key={header.id} colSpan={
                                                    header.colSpan
                                                } >
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

                                        <tr key={row.id} style={{
                                            cursor: 'pointer', backgroundColor: row.original["Cert Num"] == rowData["Cert Num"] ? "#d0d5d0" : "white",


                                        }}>
                                            {row.getVisibleCells().map((cell) => {



                                                return <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            }
                                            )}
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
                    </div>
                </div> : <div>
                    Loading
                </div>
            }
        </>
    )
}

export default BottomTable
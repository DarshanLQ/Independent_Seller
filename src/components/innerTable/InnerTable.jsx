import React, { useState, useEffect } from 'react'
import './InnerTable.css'
import { itemsData } from './data'
import {
    useReactTable, createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import { sortByClarity } from '../reactTable/sortFn'

const InnerTable = ({ parentRef, data }) => {

    const [columns, setColumns] = useState()
    const [itemData, setItemData] = useState()
    const [sorting, setSorting] = useState()
    const [width, setWidth] = useState()



    const columnHelper = createColumnHelper()

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

    const capitalize = (str) => {

        let x = str.replaceAll("_", " ")

        return x.charAt(0).toUpperCase() + x.slice(1)
    }
    const generateColumns = (data) => {

        const columns = [

        ]


        const item = data[0]
        for (const [key] of Object.entries(item)) {

            columns.push(columnHelper.accessor(key, {
                header: capitalize(key),
                id: key,
                cell: ({ row, getValue }) => (
                    <div style={{ cursor: 'pointer' }}>
                        {
                            checkLink(getValue()) ?

                                <a href={getValue()}>
                                    {
                                        getValue()
                                    }
                                </a>
                                : getValue()
                        }

                    </div >

                ),
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

                    if (key == "Clarity") {
                        a = parseInt(rowA.original[id])
                        b = parseInt(rowB.original[id])
                        sortByClarity(a, b)
                    }

                    if (a > b) return 1;
                    if (b > a) return -1;
                    return 0;
                }


            }))

        }

        setColumns(columns)


    }

    useEffect(() => {

        (async () => {
            // call the fetch request for the table data here.


            let x = await fetch(`https://app.liquid.diamonds/get_rapnet_matching_items_for_item?item_id=${data["LD ID"]}`, {
                headers: {
                    "Authorization": "Bearer d18198f276acab345ab6f3302b5a37a4"
                }
            });

            const { data } = await x.json()
            console.log(data)

            generateColumns(itemsData.data)
            setTimeout(() => setItemData(itemsData.data), 2000)
        })()
    }, [])


    useEffect(() => {
        // setWidth(parentRef?.current?.clientWidth)
        const element = parentRef?.current
        const resizeObserver = new ResizeObserver((event) => {

            let size = event[0].contentBoxSize[0].inlineSize > 600 ? event[0].contentBoxSize[0].inlineSize - 32 : event[0].contentBoxSize[0].inlineSize

            if (size !== width) {
                setWidth(size)
            }


        });
        resizeObserver.observe(element)


        return () => {
            resizeObserver.disconnect()

        }
    }, [])

    const table = useReactTable({
        data: itemData, columns, getCoreRowModel: getCoreRowModel(), state: {
            sorting
        }, onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        debugTable: true
    })

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
        <>{
            width ?
                <div style={{ textAlign: "start", maxWidth: width, }}>{

                }
                    <div style={{ display: "flex", flexDirection: "row" }} className='parentContainer'>
                        {
                            itemData ?
                                <div className='innerLeft--container'>
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


                                    <div style={{ maxWidth: width, boxSizing: "border-box", overflow: "scroll", maxHeight: "470px" }} className='innerContainer'>
                                        <table>
                                            <thead>
                                                {table.getHeaderGroups().map(headerGroup => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map(header => {
                                                            return (
                                                                <th key={header.id} colSpan={header.colSpan}>
                                                                    {header.isPlaceholder ? null : (
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
                                                        <tr key={row.id} onClick={() => row.toggleExpanded()}>
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
                                </div> : <div style={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", height: "470px" }}>
                                    Loading
                                </div>

                        }


                        <div className='rankingContainer'>
                            <table style={{ width: "100%", tableLayout: "fixed" }}>
                                <thead>
                                    <th style={{ width: "100%", textAlign: 'center', padding: "10px 5px", alignContent: "center", backgroundColor: "orange" }} colSpan={5}>

                                        {
                                            `Ranking (LD SPEC - ${data["LD Spec"]})`
                                        }


                                    </th>
                                </thead>
                                <tr >
                                    <td colSpan={5} style={{ border: "none" }}>
                                        {
                                            `LD - ${data["LD Rank"]} out of ${data["LD Count"]} similar diamonds (${Math.trunc(parseInt(data["LD Count"]) / parseInt(data["LD Rank"])) < 10 ?
                                                "Top" + " " + Math.trunc(parseInt(data["LD Count"]) / parseInt(data["LD Rank"])) + "%" :
                                                Math.trunc(parseInt(data["LD Count"]) / parseInt(data["LD Rank"])) + "%"

                                            })`
                                        }
                                    </td>

                                </tr>
                                <tr>
                                    <td colSpan={5} style={{ border: "none", borderBottom: "1px solid #cbcbcb" }} >
                                        {
                                            `RAP - ${data["Rap Rank"]} out of ${data["Rap Matching count"]} similar diamonds (${Math.trunc(parseInt(data["Rap Matching count"]) / parseInt(data["Rap Rank"])) < 10 ?
                                                "Top" + " " + Math.trunc(parseInt(data["Rap Matching count"]) / parseInt(data["Rap Rank"])) + "%" :
                                                Math.trunc(parseInt(data["Rap Matching count"]) / parseInt(data["Rap Rank"])) + "%"

                                            })`
                                        }
                                    </td>

                                </tr>
                                <tr >
                                    <td colspan={3} style={{ border: "none" }}>Use $/ct</td>
                                    <td colspan={2} style={{ border: "none", textAlign: 'left' }}>{data["Use Price"]}</td>

                                </tr>
                                <tr >
                                    <td colspan={3} style={{ border: "none" }}>Use Rap%</td>

                                    <td colspan={2} style={{ border: "none", textAlign: 'left' }}>{data["Use Rap"]}</td>
                                </tr>
                                <tr className='remove-pd'>
                                    <td>Rap 1st</td>
                                    <td>Rap 5th</td>
                                    <td>Rap 25th</td>
                                    <td>Rap 50th</td>
                                    <td>Rap 100th</td>


                                </tr>
                                <tr style={{ backgroundColor: "gray" }} className='remove-pd'>
                                    <td>{data["1st Rap %"]}</td>
                                    <td>{data["5th Rap %"]}</td>
                                    <td>{data["25th Rap %"]}</td>
                                    <td>{data["50th Rap %"]}</td>
                                    <td>{data["100th Rap %"]}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {/* {
                        table.getRowModel()
                    } */}

                </div > : ""
        }</>
    )
}

export default InnerTable

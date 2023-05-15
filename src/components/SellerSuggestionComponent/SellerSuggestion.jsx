import React, { useEffect, useRef, useState } from 'react'
import { data as datax } from './data'
import DataTable from 'react-data-table-component'
import { ColorRing } from 'react-loader-spinner'
import './SellerSuggestion.css'

const SellerSuggestion = ({ parentRef }) => {

    const [itemData, setItemData] = useState({
        id: "",
        data: ""
    })
    const [pending, setPending] = useState(true)
    const [columns, setColumns] = useState()
    const [width, setWidth] = useState()
    const containerRef = useRef()


    const capitalize = (str) => {

        let x = str.replaceAll("_", " ")

        return x.charAt(0).toUpperCase() + x.slice(1)
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

    const generateColumns = (data) => {

        const columns = []

        const item = data[0]
        for (const [key, value] of Object.entries(item)) {
            let x = {}
            x["name"] = capitalize(key)

            x["selector"] = row => {


                if (checkLink(row[key])) {

                    return <a href={row[key]}>
                        {
                            row[key]
                        }
                    </a>
                }

                return row[key]
            }
            x["sortable"] = checkLink(value) ? false : true
            x["width"] = "125px"


            columns.push(x)
        }

        setColumns(columns)


    }


    useEffect(() => {
        const data = datax

        // generateColumns(data.items)
        setItemData(data)
        setPending(false)
        if (itemData.id !== data.id) {
            generateColumns(data.data)
        }

        return () => { }
    }, [itemData.id])

    return <>
        {
            width ?
                <div style={{ maxWidth: width }} className='innerTable_container' ref={containerRef}>

                    <h1 className='innerTable_header'>
                        Similar Diamonds

                    </h1>

                    <div className='innerTable'>
                        <DataTable
                            columns={columns}
                            data={itemData.data}
                            progressPending={pending}
                            progressComponent={
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={['#00319f', '#2e56b1', '#5c7bc2', '#8aa1d3', '#b2c1e2']}
                                />
                            }
                            pagination
                        />

                    </div>
                </div> : <div></div>
        }
    </>
}

export default SellerSuggestion


//     ```
// const checkLink = (str) => {

//     if (typeof str === 'string') {
//         if (str.includes("http")) {
//             return true
//         } else {
//             return false
//         }
//     }

//     return false
// }

// const generateColumns = (data) => {

//     const columns = []

//     const item = data[0]
//     for (const [key, value] of Object.entries(item)) {
//         let x = {}
//         x["name"] = key
//         x["selector"] = row => {


//             if (checkLink(row[key])) {
//                 return <a href={row[key]}>
//                     {
//                         row[key]
//                     }
//                 </a>
//             }

//             return row[key]
//         }
//         x["width"] = "95px"

//         columns.push(x)
//     }

//     setColumns(columns)
//     setItemData(itemsData.data)

// }
// ```
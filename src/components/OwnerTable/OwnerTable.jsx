import React, { useEffect, useState, useRef } from 'react'
import { itemsData } from './data'
import DataTable from 'react-data-table-component'
import SellerSuggestion from '../SellerSuggestionComponent/SellerSuggestion'
import { SortCert, SortLDID } from './sortFn'

const OwnerTable = () => {

    const [columns, setColumns] = useState()
    const [itemData, setItemData] = useState()
    const parentRef = useRef()
    const [width, setWidth] = useState()

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

    //     ```
    // Algo:
    //     if(key is in the items to be merged)
    //         return <a href = row[itemsToBeMerged[key]]>row[key] </a>

    // ```


    //     ```
    // format:
    //     data:{
    //         id: string,
    //         item_attributes: {
    //             "[key]" : { 
    //                 "ori": string,
    //                 "key" : string, --> // value for the column
    //                 "trans": string  -->  // this the value for the row.
    //             }
    //         }


    //     }

    // ```


    // const generateColumns = (data) => {

    //     const columns = [
    //         // {
    //         //     name: "Id",
    //         //     selector: row => row.id
    //         // }
    //     ]



    //     const itemAttr = data[0].item_attributes;
    //     for (const [key, value] of Object.entries(itemAttr)) {
    //         if (value.ori) {

    //             let x = {}
    //             x["name"] = value.key
    //             x["selector"] = row => row.item_attributes[key].trans

    //             columns.push(x)
    //         }
    //     }

    //     setColumns(columns)

    // }



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


    const generateColumns = (data) => {

        const columns = []

        const item = data[0]
        for (const [key, value] of Object.entries(item)) {
            if (!itemsToBeRemoved.includes(key)) {
                let x = {}
                x["name"] = key
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
                x["width"] = "125px"
                x["sortable"] = true


                columns.push(x)
            } else {
                if (!key.includes("Url")) {
                    let x = {}
                    x["name"] = key
                    x["selector"] = row => {

                        return <a href={row[itemsToBeMerged[key]]} >
                            {
                                row[key]
                            }
                        </a>

                    }
                    x["width"] = "125px"
                    if (key == "LD ID") {
                        x["sortable"] = true
                        x["sortFunction"] = SortLDID
                    }

                    if (key == "Cert Num") {
                        x["sortable"] = true
                        x["sortFunction"] = SortCert
                    }

                    columns.push(x)
                }
            }
        }

        setColumns(columns)


    }




    useEffect(() => {

        (async () => {
            // call the fetch request for the table data here.


            generateColumns(itemsData.data)
            setItemData(itemsData.data)
        })()
    }, [])

    const ExpandedComponent = ({ data }) => <SellerSuggestion parentRef={parentRef} />;

    return (
        <div ref={parentRef} style={{
            border: "1px solid #cbcbcb",
            borderRadius: "12px",
            overflow: "hidden"
        }}>
            <DataTable
                columns={columns}
                data={itemData}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked={true}
                pagination
                paginationRowsPerPageOptions={[20, 50]}
                paginationPerPage={20}
                defaultSortFieldId={1}

            />
        </div>
    )
}

export default OwnerTable
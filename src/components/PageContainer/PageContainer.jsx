import React, { useEffect, useRef, useState } from 'react'
import TopTable from '../TopTable/TopTable'
import './PageContainer.css'
import BottomTable from '../BottomTable/BottomTable'

const PageContainer = () => {

    const [selectedItem, setSelectedItem] = useState()

    const topRef = useRef()
    const bottomRef = useRef()

    const scrollPos = () => {


        let x = bottomRef.current.scrollLeft

        let bWidth = bottomRef.current.scrollWidth - bottomRef.current.offsetWidth
        let bScrollPercent = x / bWidth * 100

        let y = (topRef.current.scrollWidth - topRef.current.offsetWidth) * bScrollPercent / 100

        topRef.current.scrollLeft = y

        console.log({
            bottomRef,
            topRef,
            x, bWidth, bScrollPercent, y
        })


    }

    useEffect(() => {
        console.log("item changed")
    }, [selectedItem])

    return (
        <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
            <div className='topTable-container' >
                <TopTable setItem={setSelectedItem} passRef={topRef} />
            </div>
            <div className='bottomTable-container'>
                {
                    selectedItem ?
                        <BottomTable rowData={selectedItem} passRef={bottomRef} scroll={scrollPos} /> :
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", }} >
                            <h2>Select a item to display similar diamonds</h2>
                        </div>
                }

            </div>
        </div>
    )
}

export default PageContainer
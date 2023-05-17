import React, { useState } from 'react'

const Filter = ({ column, table }) => {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();
    const [visible, setVisible] = useState(false)


    return typeof firstValue === "number" ? (<></>
        // <div style={{ display: "flex", flexDirection: "column" }}>
        //     <input
        //         type="number"
        //         value={(columnFilterValue)?.[0] ?? ""}
        //         onChange={(e) =>
        //             column.setFilterValue((old) => [
        //                 e.target.value,
        //                 old?.[1]
        //             ])
        //         }
        //         placeholder={`Min`}
        //         className="w-24 border shadow rounded"
        //     />
        //     <input
        //         type="number"
        //         value={(columnFilterValue)?.[1] ?? ""}
        //         onChange={(e) =>
        //             column.setFilterValue((old) => [
        //                 old?.[0],
        //                 e.target.value
        //             ])
        //         }
        //         placeholder={`Max`}
        //         className="w-24 border shadow rounded"
        //     />
        // </div>
    ) : (
        <>{
            console.log(column)
        }

            {
                column.id == "Clarity" ?
                    <div style={{ position: "relative" }}>
                        <Popup visible={visible} onChange={(e) => column.setFilterValue(e.target.value)} />
                        <button onClick={() => setVisible(prev => !prev)}>
                            +
                        </button>
                    </div> :
                    null
            }

            {/* <input
            type="text"
            value={(columnFilterValue ?? "")}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        /> */}
        </>
    );
}

export default Filter


const Popup = ({ onChange, visible }) => {

    return <div style={{ display: visible ? 'flex' : 'none', position: 'absolute', left: "0", top: "50" }}>
        <select onChange={onChange}>

            <option value={"FL"} >FL</option>
            <option value={"IF"} >IF</option>
            <option value={"VVS1"} >VVS1</option>
            <option value={"VVS2"} >VVS2</option>
            <option value={"VS1"} >VS1</option>
            <option value={"VS2"} >VS2</option>
            <option value={"SI1"} >SI1</option>
            <option value={"SI2"} >SI2</option>
            <option value={"I1"} >I1</option>
            <option value={"I2"} >I2</option>
            <option value={"I3"} >I3</option>




        </select>

    </div>

}
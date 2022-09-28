import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './desktop.module.css'
import { getItems, moveItem } from './desktopSlice';


export function Desktop() {
    const dispatch = useAppDispatch()
    const items = useAppSelector(getItems)    
    const [selected, setSelected] = useState<number | null>(null)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})
    const [shift, setShift] = useState({x: 0, y: 0})
    function mouseUp(){
        if(selected){
            dispatch(moveItem({id: selected, x: coordinates.x - shift.x, y: coordinates.y - shift.y }))
            setSelected(null)
        }
    }

    return (
        <div className={css.desktop} 
            onMouseUp={mouseUp}
            onMouseMove={(e)=>{setCoordinates({x: e.pageX, y: e.pageY})}}
            >
            {items.map(el => {
                return (
                    <div key={el.id} id={`${el.id}`} className={css.item} style={{left: el.x, top: el.y, borderColor: selected === el.id ? 'black' : 'red', cursor: 'pointer'}}
                        onMouseDown={(e)=>{
                            setSelected(el.id)
                            setShift({x: e.pageX - el.x, y: e.pageY - el.y})
                        }}
                    >
                        {el.x} - {el.y}
                    </div>
                )
            })}
            {selected && <div className={css.item} style={{left: coordinates.x - shift.x, top: coordinates.y - shift.y, position: 'absolute', borderColor: 'black'}}>
                    {coordinates.x - shift.x} - {coordinates.y - shift.y}
            </div>}
            

        </div>
    );
}

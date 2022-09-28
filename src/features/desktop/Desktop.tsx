import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './desktop.module.css'
import { addItem, deleteItem, desktopItem, getItems, moveItem } from './desktopSlice';


export function Desktop() {
    const dispatch = useAppDispatch()
    const items = useAppSelector(getItems)    
    const [selected, setSelected] = useState<number | null>(null)
    const [moving, setMoving] = useState<boolean>(false)
    const [coordinates, setCoordinates] = useState({x: 0, y: 0})
    const [shift, setShift] = useState({x: 0, y: 0})
    const [copy, setCopy] = useState<desktopItem>({id: 0, x: 10, y: 330})

    function mouseUp(){
        if(selected){
            dispatch(moveItem({id: selected, x: coordinates.x - shift.x, y: coordinates.y - shift.y }))
            setMoving(false)
            //setSelected(null)
        }
    }
    function mouseDown(){
        
    }
    function mouseMove(e: any){
        if(moving && selected){
            setCoordinates({x: e.pageX, y: e.pageY})
        }  
    }
    function copying(e: any){
        if(selected && e.ctrlKey && e.keyCode === 67){
            setCopy(items.filter(item => item.id === selected)[0])
        }
    }
    function inserting(e: any){
        if(copy.id !== 0 && e.ctrlKey && e.keyCode === 86){
            dispatch(addItem({...copy}))
        }
    }
    function deleting(e: any){
        if(e.code === 'Delete'){
            dispatch(deleteItem(selected))
        }
    }
    
    useEffect(()=>{
        window.addEventListener('keydown', copying)
        window.addEventListener('keydown', deleting)
        return () => {
            window.removeEventListener('keydown', copying)
            window.removeEventListener('keydown', deleting)
        }
        
    }, [selected])
    
    useEffect(()=>{
        window.addEventListener('keydown', inserting)
        return () => {
            window.removeEventListener('keydown', inserting)
        }
        
    }, [copy])
    
    return (
        <div className={css.desktop} 
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
        >
            {items.map(el => {
                return (
                    <div 
                        style={{left: el.x, top: el.y, borderColor: selected === el.id ? 'black' : 'red', cursor: 'pointer'}}
                        key={el.id} 
                        id={`${el.id}`} 
                        className={css.item} 
                        onMouseDown={(e)=>{
                            setMoving(true) 
                            setSelected(el.id); 
                            setShift({x: e.pageX - el.x, y: e.pageY - el.y}) 
                            setCoordinates({x: e.pageX, y: e.pageY})
                        }}
                        onClick={(e)=>{setSelected(el.id)}}
                    >
                        {el.id}
                    </div>
                )
            })}
            {selected && moving && <div 
                className={css.item} 
                style={{left: coordinates.x - shift.x, top: coordinates.y - shift.y, position: 'absolute', cursor: 'pointer', borderColor: 'rgba(0, 0, 0, 0.5)'}}>
                    {selected}
            </div>}
            

        </div>
    );
}

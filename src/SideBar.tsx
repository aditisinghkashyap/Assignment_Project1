import React, { useState } from 'react'
import users from './dummyDataForUsers/dummyData'
import { useNavigate } from 'react-router-dom'
import Routes from '../routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { changeState } from './redux/sliceSelectedUser';
import { Sidebar } from './components/ui/sidebar';

const SideBar = () => {
    const nav = useNavigate() ;
    const selected = useSelector(( state : RootState ) => state.reducerSelected.selectedItem );
    const dispatch = useDispatch() ;
    function handleClick( id : number ) {
        dispatch( changeState(id));
      nav( Routes.SCREEN_MESSAGES.slice(0, Routes.SCREEN_MESSAGES.length - 3) + id) ;
    }
    const userMessages = useSelector(( state : RootState) => state.reducerMessages ) ;
  return (
    <Sidebar>
    <div>
      <div className='pb-4 p-3 font-bold text-sm'>Your Inbox</div>
      <div className='text-sm font-bold p-1 pl-3'>{ Object.keys( userMessages).length } open</div>
     <div className='overflow-hidden w-full'> 
        { 
            users.map(( item ) => 
             <div key = {item.id} className={`flex m-1 gap-2 items-center text-sm p-2 hover:bg-[#E4EEFF] overflow-hidden transition-all ease-in-out hover:scale-[1.01] rounded-sm ${selected===item.id  && 'bg-[#E4EEFF]'}`}   onClick={() => { handleClick( item.id )}}> 
                  <div className={`w-[40px] h-[40px] rounded-[40px] border flex items-center justify-center text-white ${item.name[ 0 ].toLowerCase() === 'l' ? 'bg-[#8C8FED]' : 'bg-[#D63A5A]' }`} style={{ fontWeight : 700 }}>{item.name[0].toUpperCase()}</div>
                  <div className='flex-1 min-w-0'>
                    <div>{ item.name}</div>
                    <div className='truncate text-gray-600 text-xs'>{userMessages[ item.id.toString()] && userMessages[ item.id ].history.length > 0 && userMessages[ item.id ].history[ userMessages[ item.id ].history.length - 1 ].content  }</div>
                  </div>
             </div>
            )
        }
     </div>
    </div>
    </Sidebar>
  )
}

export default SideBar

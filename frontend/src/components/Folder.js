import React, { useState } from 'react'

import Draggable from 'react-draggable'
import DesktopItem from './DesktopItem'
import folder from '../static/pixel/folder.png'

export default function Folder({
  id,
  name,
  bringToFront,
  openWindows,
  setOpenWindows,
  activeWindow,
  setActiveWindow,
}) {
  const [selectedItem, setSelectedItem] = useState('')
  return (
    <Draggable bounds='parent'>
      <div
        className={
          activeWindow == name ? 'window active folder' : 'window folder'
        }
        id={id}
        onClick={(e) => {
          bringToFront(e.currentTarget)
          setActiveWindow(name)
        }}
        onPointerDown={(e) => {
          bringToFront(e.currentTarget)
          setActiveWindow(name)
        }}
      >
        <div className='window-header'>
          <div className='window-header-label'>
            <img draggable='false' src={folder} height='15px' />
            &nbsp;{name}
          </div>
          <button
            className='x-button'
            onClick={() => {
              setOpenWindows(openWindows.filter((item) => item !== name))
            }}
          >
            X
          </button>
        </div>
        <div
          className='window-body'
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            overflow: 'scroll',
          }}
        >
          <DesktopItem
            name='archive'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
          <DesktopItem
            name='f1'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
          <DesktopItem
            name='f2'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
          <DesktopItem
            name='f3'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
          <DesktopItem
            name='f4'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
          <DesktopItem
            name='f5'
            icon='folder'
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            openWindows={openWindows}
            setOpenWindows={setOpenWindows}
          />
        </div>
      </div>
    </Draggable>
  )
}

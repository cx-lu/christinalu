import React, { useState, useEffect } from 'react'
import * as moment from 'moment'
import './styles.css'

import DesktopItem from './components/DesktopItem'
import Notes from './components/Notes'
import Folder from './components/Folder'
import TextFile from './components/TextFile'
import MenuBarTab from './components/MenuBarTab'

import files from './static/files.json'
import cactus from './static/pixel/cactus.png'

export default function App() {
  const [now, setNow] = useState(moment())

  const [selectedItem, setSelectedItem] = useState('')
  const [openWindows, setOpenWindows] = useState(['welcome.txt'])
  const [activeWindow, setActiveWindow] = useState('welcome.txt')
  const [highestIndex, setHighestIndex] = useState(0)

  useEffect(() => {
    let timer = setInterval(() => {
      setNow(moment())
    }, 1000) // every second
    return () => clearInterval(timer)
  }, [])

  function bringToFront(e) {
    e.currentTarget.style.zIndex = highestIndex + 1
    setHighestIndex(highestIndex + 1)
  }

  return (
    <div className='desktop'>
      <div className='desktop-items'>
        <DesktopItem
          name='archive'
          icon='folder'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
        <DesktopItem
          name='pix'
          icon='folder'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
        <DesktopItem
          name='notes'
          icon='notes'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
        <DesktopItem
          name='welcome.txt'
          icon='textfile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
        <DesktopItem
          name='dreams.txt'
          icon='textfile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
        <DesktopItem
          name='me.png'
          icon='imagefile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
        />
      </div>
      {files.map(
        (file) =>
          openWindows.indexOf(file.name) !== -1 && (
            <TextFile
              key={file.id}
              id={file.id}
              name={file.name}
              body={file.content}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              bringToFront={bringToFront}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
            />
          )
      )}
      {openWindows.indexOf('me.png') !== -1 && (
        <TextFile
          key={'me'}
          id={'me'}
          name={'me.png'}
          body={''}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          bringToFront={bringToFront}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
        />
      )}
      {openWindows.indexOf('notes') !== -1 && (
        <Notes
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          bringToFront={bringToFront}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
        />
      )}
      {openWindows.indexOf('archive') !== -1 && (
        <Folder
          id='archive'
          name='archive'
          bringToFront={bringToFront}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
        />
      )}
      <div className='menu-bar'>
        <div className='menu-bar-content'>
          <div className='menu-bar-left'>
            <div className='start'>
              <img src={cactus} />
              <strong>&nbsp;C</strong>/<strong>LU</strong>
            </div>
            {openWindows.map((file) => (
              <MenuBarTab
                name={file}
                type={'textfile'}
                activeWindow={activeWindow}
                setActiveWindow={setActiveWindow}
              />
            ))}
          </div>
          <div className='time'>{now.format('h:mm A')}</div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import * as moment from 'moment'
import './styles.css'

import DesktopItem from './components/DesktopItem'
import Notes from './components/Notes'
import Folder from './components/Folder'
import TextFile from './components/TextFile'
import ImageFile from './components/ImageFile'
import MenuBarTab from './components/MenuBarTab'

import cactus from './static/pixel/cactus.png'

const FILES_URL = 'http://127.0.0.1:8000/files/'

export default function App() {
  const [now, setNow] = useState(moment())

  const [selectedItem, setSelectedItem] = useState('')
  const [openWindows, setOpenWindows] = useState(['welcome.txt'])
  const [activeWindow, setActiveWindow] = useState('welcome.txt')
  const [highestIndex, setHighestIndex] = useState(0)
  const [files, setFiles] = useState([])

  // Get current time for display
  useEffect(() => {
    let timer = setInterval(() => {
      setNow(moment())
    }, 1000) // every second
    return () => clearInterval(timer)
  }, [])

  // Get files on Desktop
  useEffect(() => {
    axios
      .get(FILES_URL)
      .then((res) => setFiles(res.data))
      .catch((err) => console.log(err))
  }, [])

  function bringToFront(element) {
    element.style.zIndex = highestIndex + 1
    setHighestIndex(highestIndex + 1)
  }

  return (
    <div className='desktop'>
      <div className='desktop-items'>
        <DesktopItem
          id='archive'
          name='archive'
          icon='folder'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        <DesktopItem
          id='pix'
          name='pix'
          icon='folder'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        <DesktopItem
          id='notes'
          name='notes'
          icon='notes'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        <DesktopItem
          id='welcome'
          name='welcome.txt'
          icon='textfile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        <DesktopItem
          id='dreams'
          name='dreams.txt'
          icon='textfile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        <DesktopItem
          id='me'
          name='me.png'
          icon='imagefile'
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
      </div>
      {files.map(
        (file) =>
          openWindows.indexOf(file.name) !== -1 &&
          (file.type === 'IMG' ? (
            <ImageFile
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
          ) : (
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
          ))
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

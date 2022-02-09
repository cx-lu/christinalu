import React from 'react'

import folder from '../static/pixel/folder.png'
import notes from '../static/pixel/notes.png'
import textfile from '../static/pixel/textfile.png'
import imagefile from '../static/pixel/imagefile.png'

export default function DesktopItem({
  name,
  icon,
  selectedItem,
  setSelectedItem,
  openWindows,
  setOpenWindows,
}) {
  return (
    <div
      className='desktop-item noselect'
      onClick={() => {
        if (selectedItem == name) {
          setSelectedItem('')
        } else {
          setSelectedItem(name)
        }
      }}
      onDoubleClick={() => {
        if (openWindows.indexOf(name) == -1) {
          setOpenWindows((openWindows) => [...openWindows, name])
        }
        setSelectedItem('')
      }}
    >
      <div
        className={
          selectedItem == name ? 'selected-desktop-icon' : 'desktop-icon'
        }
      >
        {icon == 'folder' ? (
          <img draggable='false' src={folder} />
        ) : icon == 'notes' ? (
          <img draggable='false' src={notes} />
        ) : icon == 'textfile' ? (
          <img draggable='false' src={textfile} />
        ) : icon == 'imagefile' ? (
          <img draggable='false' src={imagefile} />
        ) : (
          <img />
        )}
      </div>
      <div
        className={
          selectedItem == name ? 'selected-desktop-label' : 'desktop-label'
        }
      >
        <span>{name}</span>
      </div>
    </div>
  )
}

import React from 'react'

import folder from '../static/pixel/folder.png'
import notes from '../static/pixel/notes.png'
import textfile from '../static/pixel/textfile.png'
import imagefile from '../static/pixel/imagefile.png'

export default function MenuBarTab({
  name,
  type,
  activeWindow,
  setActiveWindow,
}) {
  return (
    <div
      className={activeWindow == name ? 'active-open-file' : 'open-file'}
      key={name}
      onMouseDown={() => setActiveWindow(name)}
    >
      <img
        draggable='false'
        src={
          type === 'notes'
            ? notes
            : type === 'imagefile'
            ? imagefile
            : type === 'folder'
            ? folder
            : textfile
        }
        height='15px'
      />
      &nbsp;{name}
    </div>
  )
}

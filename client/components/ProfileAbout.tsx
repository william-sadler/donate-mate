import { useState } from 'react'

interface Props {
  about: string
}

export default function ProfileAbout({ about }: Props) {
  const [drop, setDrop] = useState(false)

  return (
    <>
      <button
        className="primary_button, paragraph"
        onClick={() => setDrop(!drop)}
      >
        About Organisation
      </button>
      {drop && <div>{about}</div>}
    </>
  )
}

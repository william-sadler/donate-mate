import { useState } from 'react'

interface Props {
  about: string
}

export default function ProfileAbout({ about }: Props) {
  const [drop, setDrop] = useState(false)

  return (
    <section className=" teal-shadow border-1 container m-2 max-w-lg border border-darkerTeal border-opacity-25 px-8 py-6">
      <button
        className="primary_button, heading-4"
        onClick={() => setDrop(!drop)}
      >
        About Organisation
      </button>
      {drop && <div className="paragraph">{about}</div>}
    </section>
  )
}

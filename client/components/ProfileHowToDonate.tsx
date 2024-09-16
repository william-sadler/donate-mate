import { useState } from 'react'

interface Props {
  method?: string
}

export default function ProfileHowToDonate({ method }: Props) {
  const [drop, setDrop] = useState(false)

  return (
    <section className="teal-shadow border-1 container m-2 mb-10 w-96 border border-darkerTeal border-opacity-25 px-8 py-6">
      <button
        className="primary_button, heading-4 "
        onClick={() => setDrop(!drop)}
      >
        How to Donate
      </button>
      {drop && <div className="paragraph">{method}</div>}
    </section>
  )
}

import { useState } from 'react'

interface Props {
  method?: string
}

export default function ProfileHowToDonate({ method }: Props) {
  const [drop, setDrop] = useState(false)

  return (
    <>
      <button
        className="primary_button, heading-4"
        onClick={() => setDrop(!drop)}
      >
        How to Donate
      </button>
      {drop && <div className="paragraph">{method}</div>}
    </>
  )
}

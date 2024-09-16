import { useState } from 'react'

interface Props {
  method?: string
}

export default function ProfileHowToDonate({ method }: Props) {
  const [drop, setDrop] = useState(false)

  return (
    <section className="teal-shadow border-1 m2 container  mb-10 w-96 border border-darkerTeal border-opacity-25 px-8 py-7">
      <button
        className="primary_button, heading-4 "
        onClick={() => setDrop(!drop)}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        How to Donate
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{
            marginLeft: '8px',
            transition: 'transform 0.3s',
            transform: drop ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      {drop && <div className="paragraph">{method}</div>}
    </section>
  )
}

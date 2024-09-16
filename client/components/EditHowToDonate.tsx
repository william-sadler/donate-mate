interface Props {
  orgHowToDonate: string
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function EditHowToDonate({
  orgHowToDonate,
  handleChange,
}: Props) {
  return (
    <>
      <div className="col-span-full w-96">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          How To Donate
        </label>
        <div className="mt-2">
          <textarea
            rows={3}
            name="orgMethod"
            id="orgInput"
            value={orgHowToDonate}
            placeholder="How do we donate to you?"
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            onChange={handleChange}
            className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>
    </>
  )
}

export default function Footer() {
  return (
    <>
      <footer className="px20 min-h-[10svh] bg-gradient-to-b from-brightTeal to-lightTeal py-5 pl-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img
              src="/images/iconLogo.png"
              className="mr-5 h-6 sm:h-9"
              alt="logo"
            />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">About</p>
            </div>
            <div>
              <p className="font-medium">Social Media</p>
            </div>
            <div>
              <p className="font-medium">Useful Links</p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-800">
          © Mako-Kōtare 2024 | DonateMate Limited
        </p>
      </footer>
    </>
  )
}

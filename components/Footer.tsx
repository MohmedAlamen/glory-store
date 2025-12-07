export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container py-6 text-sm text-gray-600 dark:text-gray-300">
        <div>© {new Date().getFullYear()} Glory Store — All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">About Us</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">The Problem Students Face</h3>
            <p className="text-gray-600 dark:text-gray-400">As students, rushing to distant print shops, paying exorbitant ₹4 per page, and dealing with delays can be a nightmare, especially with tight deadlines for assignments and projects.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">How We Solve It</h3>
            <p className="text-gray-600 dark:text-gray-400">StudentPrint brings printing to your doorstep. With affordable ₹2 per page rates, free delivery near the college back gate, and flexible packages, we make your academic life easier. Fast, reliable, and student-focused!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

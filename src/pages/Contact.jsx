export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <i className="fas fa-phone text-primary text-2xl mb-2"></i>
              <p className="text-gray-600 dark:text-gray-300">Phone: +91 63712 72308</p>
            </div>
            <div>
              <i className="fas fa-envelope text-primary text-2xl mb-2"></i>
              <p className="text-gray-600 dark:text-gray-300">Email: info@printifyy.in</p>
            </div>
            <button onClick={() => window.open('https://wa.me/916371272308', '_blank')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center">
              <i className="fab fa-whatsapp mr-2"></i> Chat on WhatsApp
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Delivery Point</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Near College Back Gate</p>
            <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Google Maps Embed Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

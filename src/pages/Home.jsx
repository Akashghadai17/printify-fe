export default function Home() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Affordable Printing for Busy Students</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Say goodbye to long queues and high prices. Get your assignments printed and delivered right to the college back gate for just ₹2 per page.
        </p>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: 'fa-truck', title: 'Free Delivery', desc: 'Near college back gate' },
            { icon: 'fa-tag', title: '₹2 per Page', desc: 'Half the shop price' },
            { icon: 'fa-gift', title: 'Special Packages', desc: 'Monthly to Yearly savings' },
            { icon: 'fa-book', title: 'Binding Options', desc: 'Soft & Spiral binding' },
          ].map(f => (
            <div key={f.title} className="bg-white bg-opacity-20 p-4 rounded-lg">
              <i className={`fas ${f.icon} text-3xl mb-2`}></i>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={() => scrollTo('upload')} className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
          Upload Your Assignment Now
        </button>
      </div>
    </section>
  )
}

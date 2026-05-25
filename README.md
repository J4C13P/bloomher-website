export default function NutritionPracticeWebsite() {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-100 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-[#7B1E3A] text-sm font-semibold mb-4">
              Personalized Nutrition Care
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Helping You Build a Healthier Relationship With Food
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Evidence-based nutrition guidance tailored to your lifestyle, health goals, and long-term wellness. Whether you want to improve your eating habits, manage a health condition, or nourish your family better, your journey starts here.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-[#7B1E3A] hover:bg-[#5e172d] text-white px-6 py-3 rounded-2xl shadow-lg transition-all">
                Book a Consultation
              </button>
              <button className="border border-gray-300 hover:border-[#7B1E3A] px-6 py-3 rounded-2xl transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                alt="Healthy foods"
                className="rounded-3xl h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
            alt="Nutritionist"
            className="rounded-[2rem] shadow-xl object-cover h-[500px] w-full"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-6">Meet Your Nutritionist</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Hi! I’m Cecilia Lwawasi, a dedicated nutrition professional passionate about empowering individuals and families to achieve healthier lives through balanced, evidence-based nutrition care. I believe nutrition should be practical, sustainable, and tailored to each person’s unique lifestyle and health needs.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            My approach focuses on personalized nutrition assessment, education, and long-term lifestyle changes rather than restrictive dieting. I support clients through every stage of care — from assessment and diagnosis to intervention, monitoring, and evaluation — helping them build healthier relationships with food while improving overall wellness and quality of life.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-md p-5 border border-stone-100">
              <h3 className="font-semibold text-xl mb-2">5+ Years</h3>
              <p className="text-gray-500">Nutrition Experience</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 border border-stone-100">
              <h3 className="font-semibold text-xl mb-2">1-on-1 Care</h3>
              <p className="text-gray-500">Personalized Guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Support designed to help you feel healthier, stronger, and more confident in your food choices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Nutrition Assessment',
                text: 'Comprehensive nutrition assessments to evaluate dietary habits, health status, and nutritional needs.'
              },
              {
                title: 'Nutrition Diagnosis',
                text: 'Identification of nutrition-related problems and development of evidence-based care plans.'
              },
              {
                title: 'Nutrition Intervention',
                text: 'Personalized interventions designed to improve health outcomes and support wellness goals.'
              },
              {
                title: 'Monitoring & Evaluation',
                text: 'Continuous follow-up and evaluation to track progress and adjust nutrition care plans.'
              },
              {
                title: 'Meal Planning & Consultation',
                text: 'Customized meal plans and one-on-one consultations tailored to your lifestyle and health goals.'
              },
              {
                title: 'Referrals',
                text: 'Professional referrals and collaborative care support when specialized services are needed.'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-stone-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 mb-6 flex items-center justify-center text-2xl">
                  🥗
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-gray-600 text-lg">
              Real experiences from people who transformed their habits and health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              'I finally learned how to eat without guilt and saw amazing improvements in my energy levels.',
              'The meal plans were realistic and easy to follow. My whole family benefited.',
              'Professional, supportive, and incredibly knowledgeable. I felt heard every step of the way.'
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100"
              >
                <p className="text-gray-700 leading-relaxed mb-6">“{review}”</p>
                <div>
                  <h4 className="font-semibold">Happy Client</h4>
                  <p className="text-sm text-gray-500">Nutrition Coaching</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Book a consultation today and take the first step toward healthier habits and sustainable wellness.
          </p>

          <div className="bg-stone-50 rounded-[2rem] p-10 shadow-xl border border-stone-100">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-xl mb-2">Phone</h3>
                <p className="text-gray-600">+254 705 104 591</p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Email</h3>
                <p className="text-gray-600">cecilialwawasi@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Location</h3>
                <p className="text-gray-600">Mombasa, Kenya</p>
              </div>
            </div>

            <button className="mt-10 bg-[#7B1E3A] hover:bg-[#5e172d] text-white px-8 py-4 rounded-2xl text-lg shadow-lg transition-all">
              Schedule an Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">BloomHer Nutrition Services</h3>
            <p className="text-gray-400 mt-2">Nutrition care focused on real life and lasting wellness.</p>
          </div>

          <div className="flex gap-6 text-gray-300">
            <a href="https://www.linkedin.com/in/cecilia-lwawasi-608520304" className="hover:text-white transition-all">Contact</a>
            <a href="https://www.linkedin.com/in/cecilia-lwawasi-608520304" className="hover:text-white transition-all">Email</a>
            <a href="https://www.linkedin.com/in/cecilia-lwawasi-608520304" className="hover:text-white transition-all">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

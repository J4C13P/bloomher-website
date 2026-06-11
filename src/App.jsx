import { useState } from "react";
import {
  Calendar,
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  ChefHat,
  ClipboardList,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Clock,
  Plus
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const mockUsers = [
  { email: "client@test.com", password: "1234", role: "client", subscription: "basic", name: "Jane Doe" },
  { email: "nutri@test.com", password: "1234", role: "nutritionist", subscription: "pro", name: "Cecilia Lwawasi" }
];

const initialBookings = [
  { id: 1, client: "John Smith", service: "Nutrition Assessment", date: "2024-06-12", status: "Upcoming" },
  { id: 2, client: "Sarah Wanjiku", service: "Meal Planning", date: "2024-06-11", status: "Completed" },
  { id: 3, client: "David M.", service: "Lifestyle Coaching", date: "2024-06-15", status: "Upcoming" },
];

/* ---------------- AI MEAL PLAN GENERATOR ---------------- */
function generateMealPlan(goal, allergies, budget) {
  return `
🍽 7-Day Kenyan Meal Plan

Goal: ${goal}
Allergies: ${allergies}
Budget: ${budget} KSh/day

DAY 1:
- Breakfast: Oats + banana
- Lunch: Rice + beans + spinach
- Dinner: Ugali + sukuma wiki

DAY 2:
- Breakfast: Tea + eggs + bread
- Lunch: Githeri
- Dinner: Fish + rice

💡 Drink 2–3L water daily
`;
}

/* ---------------- COMPONENTS ---------------- */

const Nav = ({ setView, user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span
              className="text-2xl font-bold text-burgundy cursor-pointer"
              onClick={() => setView('home')}
            >
              BloomHer
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className="text-gray-600 hover:text-burgundy font-medium">Home</button>
            {user ? (
              <>
                <button onClick={() => setView('dashboard')} className="text-gray-600 hover:text-burgundy font-medium">Dashboard</button>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Hi, {user.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-burgundy font-semibold border border-burgundy px-4 py-1.5 rounded-xl hover:bg-burgundy hover:text-white transition-all"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setView('login')}
                className="bg-burgundy text-white px-6 py-2 rounded-xl hover:bg-burgundy-dark transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2">
          <button onClick={() => { setView('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-gray-600">Home</button>
          {user ? (
            <>
              <button onClick={() => { setView('dashboard'); setIsOpen(false); }} className="block w-full text-left py-2 text-gray-600">Dashboard</button>
              <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left py-2 text-burgundy font-semibold">Logout</button>
            </>
          ) : (
            <button onClick={() => { setView('login'); setIsOpen(false); }} className="block w-full text-left py-2 text-burgundy font-semibold">Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold">BloomHer Nutrition Services</h3>
        <p className="text-gray-400 mt-2">Nutrition care focused on real life and lasting wellness.</p>
      </div>

      <div className="flex gap-6 md:justify-end text-gray-300">
        <a href="#" className="hover:text-white transition-all">Contact</a>
        <a href="#" className="hover:text-white transition-all">Email</a>
        <a href="#" className="hover:text-white transition-all">LinkedIn</a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} BloomHer Nutrition. All rights reserved.
    </div>
  </footer>
);

/* ---------------- APP MAIN ---------------- */

export default function App() {
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AI Planner state
  const [goal, setGoal] = useState("");
  const [allergies, setAllergies] = useState("");
  const [budget, setBudget] = useState("");
  const [mealPlan, setMealPlan] = useState("");

  // Booking state
  const [bookings, setBookings] = useState(initialBookings);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newBooking, setNewBooking] = useState({ service: "Nutrition Assessment", date: "" });

  const login = () => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      setView("dashboard");
    } else alert("Invalid login credentials");
  };

  const logout = () => {
    setUser(null);
    setView("home");
  };

  const handleGeneratePlan = () => {
    if (!goal || !budget) {
      alert("Please fill in your goal and budget");
      return;
    }
    setMealPlan(generateMealPlan(goal, allergies, budget));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!newBooking.date) {
      alert("Please select a date");
      return;
    }
    const booking = {
      id: bookings.length + 1,
      client: user.name,
      service: newBooking.service,
      date: newBooking.date,
      status: "Upcoming"
    };
    setBookings([booking, ...bookings]);
    setShowBookingForm(false);
    alert("Booking successful!");
  };

  /* ---------------- VIEWS ---------------- */

  const HomeView = () => (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-burgundy text-sm font-semibold mb-4">
              Personalized Nutrition Care
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Helping You Build a Healthier Relationship With Food
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Evidence-based nutrition guidance tailored to your lifestyle, health goals, and long-term wellness.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setView('login')}
                className="bg-burgundy hover:bg-burgundy-dark text-white px-8 py-4 rounded-2xl shadow-lg transition-all font-semibold flex items-center gap-2"
              >
                Book a Consultation <ChevronRight size={18} />
              </button>
              <button className="bg-white border border-gray-200 hover:border-burgundy px-8 py-4 rounded-2xl transition-all font-semibold">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 md:p-6 border border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                alt="Healthy foods"
                className="rounded-[2rem] h-[350px] md:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Support designed to help you feel healthier, stronger, and more confident.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Nutrition Assessment', icon: <ClipboardList />, color: 'bg-blue-100', text: 'Comprehensive evaluations of your dietary habits and health status.' },
              { title: 'Meal Planning', icon: <ChefHat />, color: 'bg-burgundy/10', text: 'Customized plans tailored to your lifestyle and health goals.' },
              { title: 'Lifestyle Coaching', icon: <TrendingUp />, color: 'bg-green-100', text: 'Long-term support for sustainable behavior change.' }
            ].map((service, index) => (
              <div key={index} className="bg-stone-50 rounded-3xl p-8 hover:shadow-xl transition-all border border-stone-100 group">
                <div className={`w-14 h-14 rounded-2xl ${service.color} mb-6 flex items-center justify-center text-burgundy group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
            alt="Nutritionist"
            className="rounded-[2.5rem] shadow-xl object-cover h-[400px] md:h-[550px] w-full"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Cecilia Lwawasi</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Dedicated nutrition professional passionate about empowering individuals and families to achieve healthier lives.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-burgundy shrink-0 mt-1" size={20} />
              <p className="text-gray-700">5+ Years of Clinical Experience</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-burgundy shrink-0 mt-1" size={20} />
              <p className="text-gray-700">Evidence-Based Approach</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-burgundy shrink-0 mt-1" size={20} />
              <p className="text-gray-700">Personalized Care Plans</p>
            </div>
          </div>
          <button
            onClick={() => setView('login')}
            className="bg-burgundy text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-burgundy-dark transition-all font-semibold"
          >
            Get to Know Me
          </button>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Book a consultation today and take the first step toward wellness.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-burgundy/10 rounded-xl text-burgundy"><Phone size={20} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Call Us</p>
                <p className="font-semibold">+254 705 104 591</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-burgundy/10 rounded-xl text-burgundy"><Mail size={20} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</p>
                <p className="font-semibold">cecilia@bloomher.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-burgundy/10 rounded-xl text-burgundy"><MapPin size={20} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Location</p>
                <p className="font-semibold">Mombasa, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const LoginView = () => (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 px-6">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Login to manage your nutrition journey.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={login}
            className="w-full bg-burgundy text-white py-4 rounded-xl font-bold shadow-lg hover:bg-burgundy-dark transition-all mt-4"
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <span className="text-burgundy font-bold cursor-pointer">Register</span>
          </p>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-burgundy rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                {user.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{user.name}</h4>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-stone-50 text-burgundy rounded-xl font-semibold">
                <LayoutDashboard size={20} /> Overview
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-stone-50 rounded-xl transition-all">
                <Calendar size={20} /> Bookings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-stone-50 rounded-xl transition-all">
                <Settings size={20} /> Settings
              </button>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-burgundy to-burgundy-dark p-6 rounded-3xl text-white shadow-lg">
            <h5 className="font-bold mb-2">Upgrade to Pro</h5>
            <p className="text-xs text-white/80 mb-4">Get unlimited meal plans and 24/7 support.</p>
            <button className="w-full bg-white text-burgundy py-2 rounded-xl text-sm font-bold">
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">

          {/* Welcome Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-500">Welcome back, {user.name}!</p>
            </div>
            {user.role === 'client' && (
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-burgundy text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:bg-burgundy-dark transition-all flex items-center gap-2"
              >
                <Plus size={20} /> New Appointment
              </button>
            )}
          </header>

          {/* Booking Form Modal */}
          {showBookingForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-lg shadow-2xl relative">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <h3 className="text-2xl font-bold mb-6">Schedule Appointment</h3>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy outline-none"
                      value={newBooking.service}
                      onChange={(e) => setNewBooking({...newBooking, service: e.target.value})}
                    >
                      <option>Nutrition Assessment</option>
                      <option>Meal Planning</option>
                      <option>Lifestyle Coaching</option>
                      <option>Follow-up Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferred-date" className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      id="preferred-date"
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy outline-none"
                      onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-burgundy text-white py-4 rounded-xl font-bold shadow-lg hover:bg-burgundy-dark transition-all"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {user.role === 'nutritionist' ? 'Total Patients' : 'Active Plans'}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {user.role === 'nutritionist' ? '128' : '12'}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {user.role === 'nutritionist' ? 'Pending Bookings' : 'Next Appointment'}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {user.role === 'nutritionist' ? bookings.length : 'Tomorrow'}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {user.role === 'nutritionist' ? 'Monthly Revenue' : 'Health Score'}
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {user.role === 'nutritionist' ? 'KSh 45,200' : '85%'}
              </h3>
            </div>
          </div>

          {/* AI Planner Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ChefHat size={24} /></div>
              <h3 className="text-xl font-bold text-gray-900">AI Meal Planner</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <input
                placeholder="Your Goal (e.g. Weight Loss)"
                className="px-4 py-3 rounded-xl border border-gray-100 focus:border-blue-300 outline-none transition-all bg-stone-50"
                onChange={(e) => setGoal(e.target.value)}
              />
              <input
                placeholder="Allergies"
                className="px-4 py-3 rounded-xl border border-gray-100 focus:border-blue-300 outline-none transition-all bg-stone-50"
                onChange={(e) => setAllergies(e.target.value)}
              />
              <input
                placeholder="Daily Budget (KSh)"
                className="px-4 py-3 rounded-xl border border-gray-100 focus:border-blue-300 outline-none transition-all bg-stone-50"
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <button
              onClick={handleGeneratePlan}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              Generate Custom Plan
            </button>

            {mealPlan && (
              <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-gray-100 border-dashed">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{mealPlan}</pre>
              </div>
            )}
          </section>

          {/* Recent Bookings Table (Admin View) */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-burgundy/10 text-burgundy rounded-2xl">
                  {user.role === 'nutritionist' ? <Users size={24} /> : <Calendar size={24} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {user.role === 'nutritionist' ? 'Recent Patient Bookings' : 'My Appointments'}
                </h3>
              </div>
              <button className="text-burgundy font-bold text-sm">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 text-gray-400 text-sm uppercase tracking-wider font-bold">
                    <th className="pb-4 px-2">{user.role === 'nutritionist' ? 'Client' : 'Service'}</th>
                    <th className="pb-4 px-2">{user.role === 'nutritionist' ? 'Service' : 'Nutritionist'}</th>
                    <th className="pb-4 px-2">Date</th>
                    <th className="pb-4 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(user.role === 'nutritionist' ? bookings : bookings.filter(b => b.client === user.name)).map((booking) => (
                    <tr key={booking.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4 px-2 font-semibold text-gray-900">
                        {user.role === 'nutritionist' ? booking.client : booking.service}
                      </td>
                      <td className="py-4 px-2 text-gray-600">
                        {user.role === 'nutritionist' ? booking.service : 'Cecilia Lwawasi'}
                      </td>
                      <td className="py-4 px-2 text-gray-500">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <Clock size={14} className="text-burgundy" /> {booking.date}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-black ${
                          booking.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {user.role === 'client' && bookings.filter(b => b.client === user.name).length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-400 italic">No appointments booked yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Nav setView={setView} user={user} logout={logout} />

      {view === "home" && <HomeView />}
      {view === "login" && <LoginView />}
      {view === "dashboard" && user && <DashboardView />}

      <Footer />
    </div>
  );
}

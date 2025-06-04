import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-yellow-300">
        Color App
      </Link>
      <div className="flex gap-6 items-center">
        <DropdownMenu />
        <Link to="/about" className="hover:text-yellow-300">About</Link>
        <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
      </div>
    </nav>
  );
}

// Dropdown Menu Component
function DropdownMenu() {
  return (
    <div className="relative group">
      <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
        More
      </button>
      <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-40 z-50">
        <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">About</Link>
        <Link to="/contact" className="block px-4 py-2 hover:bg-gray-200">Contact</Link>
        <Link to="/" className="block px-4 py-2 hover:bg-gray-200">Home</Link>
      </div>
    </div>
  );
}

// Home Page Component
function Home() {
  const [color, setColor] = useState("olive");

  return (
    <div className="w-full h-screen pt-20 duration-300" style={{ backgroundColor: color }}>
      <h1 className="text-center text-3xl text-white font-semibold mb-8">
        Welcome to the Color Switcher App!
      </h1>

      <div className="flex justify-center flex-wrap gap-4 px-4">
        {[
          { name: "Red", value: "red", bg: "bg-red-500", hover: "hover:bg-red-600" },
          { name: "Green", value: "green", bg: "bg-green-500", hover: "hover:bg-green-600" },
          { name: "Blue", value: "blue", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
          { name: "Yellow", value: "yellow", bg: "bg-yellow-400", hover: "hover:bg-yellow-500" },
          { name: "Purple", value: "purple", bg: "bg-purple-600", hover: "hover:bg-purple-700" },
          { name: "Orange", value: "orange", bg: "bg-orange-500", hover: "hover:bg-orange-600" },
        ].map(({ name, value, bg, hover }) => (
          <button
            key={value}
            onClick={() => setColor(value)}
            className={`px-4 py-2 text-white rounded ${bg} ${hover}`}
          >
            {name}
          </button>
        ))}
      </div>

      <FloatingMessage />
    </div>
  );
}

// Floating Message
function FloatingMessage() {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF1493", "#FFC300", "#7FFF00"];
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(prev => {
        const index = (colors.indexOf(prev) + 1) % colors.length;
        return colors[index];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 text-white px-4 py-2 rounded shadow-lg animate-bounce"
      style={{ backgroundColor: color }}
    >
      🎨 Tap a color to switch background!
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="p-8 max-w-xl mx-auto mt-24 bg-white shadow rounded text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About This Website</h1>
      <p className="mb-3">
        Welcome to the Color Switcher App! 🎨 This app is built using React and Tailwind CSS. You can switch background colors with a click, and navigate between pages.
      </p>
    </div>
  );
}

// Contact Page
function Contact() {
  return (
    <div className="p-8 max-w-xl mx-auto mt-24 bg-white shadow rounded text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Your name" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full border px-3 py-2 rounded" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input type="tel" className="w-full border px-3 py-2 rounded" placeholder="123-456-7890" />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea className="w-full border px-3 py-2 rounded" rows="4" placeholder="Your message"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
}

// 404 Page
function NotFound() {
  return <div className="text-center mt-32 text-3xl text-red-600">404 - Page Not Found</div>;
}

// Main App Component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

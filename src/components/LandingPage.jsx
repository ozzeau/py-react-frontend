import { Link } from "react-router-dom"
import "./LandingPage.css"
import specialEventImage from "../assets/special-event_2.svg";
import chefImage from "../assets/undraw_hamburger_falh.svg";
import realTimeAnalytics from "../assets/undraw_time-management_fedt.svg";
import priceImage from "../assets/undraw_stock-prices_16kd.svg";
import interfaceImage from "../assets/undraw_bento-grid_qfc0.svg";
import Header from "../layout/Header"
import Footer from "../layout/Footer";
import RedText from "./RedText";

function LandingPage() {
  return (
    <div className="flex flex-col h-full ">
      <Header />
      <main className="flex flex-col w-full mx-auto ">
        <section id="home" className="w-full h-screen bg-blue-50 flex flex-col items-center pt-20 md:pt-0">
          <div className="w-full px-4 md:px-6 flex flex-col md:flex-row gap-12 items-center h-full">
            <div className="space-y-6 w-full md:w-1/2 flex flex-col items-center md:items-start ">
              <RedText>Restaurant Management Made Easy</RedText>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
                Streamline Your Restaurant <span className="text-red-800 relative">Operations<span className="absolute bottom-1 md:bottom-2 left-0 w-full h-[3px] bg-red-600/50 rounded-full"></span></span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl w-full">
                Welcome to <strong>Brand</strong>, the ultimate platform for restaurant owners and staff to manage menus and user accounts. Enjoy a seamless experience with role-based access, menu editing, and user management — all in one place.
              </p>
            </div>
            <div className="relative w-full md:w-1/2">
              <div className="w-full rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <img
                  src={specialEventImage}
                  alt="Restaurant Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="functionality" className="relative py-16 md:py-24 flex flex-col items-center w-full min-h-screen  ">
          <RedText>Functionality</RedText>
          <div className="container px-4 md:px-6 md:grid-cols-2 gap-12 flex items-center flex-col pt-8">
            <div className="gap-4 flex flex-col">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 flex flex-col items-center">Everything You Need</h1>
              <p className="text-gray-600 text-lg md:text-xl">Powerful tools to manage your online orders seamlessly. Create your menu, adjust prices, and receive orders in real-time with an intuitive interface.</p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 list-none  pt-20 w-screen xl:p-16 p-4">
              <li className="bg-blue-50 p-6 rounded-xl shadow border border-gray-200 flex items-center text-center hover:bg-blue-100 hover:scale-103 transition-transform duration-300">
                <img src={chefImage} alt="Chef Illustration" className="w-20 h-auto mb-4 pr-6" />
                <p>Create and manage your restaurant with personalized information.</p>
              </li>
              <li className="bg-blue-50 p-6 rounded-xl shadow border border-gray-200 flex items-center text-center hover:bg-blue-100 hover:scale-103 transition-transform duration-300">
                <img src={realTimeAnalytics} alt="Chef Illustration" className="w-20 h-auto mb-4 pr-6" />
                <p>Update and manage your menu in real time.</p>
              </li>
              <li className="bg-blue-50 p-6 rounded-xl shadow border border-gray-200 flex items-center text-center hover:bg-blue-100 hover:scale-103 transition-transform duration-300">
                <img src={priceImage} alt="Chef Illustration" className="w-20 h-auto mb-4 pr-6" />
                <p>Control your prices and product availability.</p>
              </li>
              <li className="bg-blue-50 p-6 rounded-xl shadow border border-gray-200 flex items-center text-center hover:bg-blue-100 hover:scale-103 transition-transform duration-300">
                <img src={interfaceImage} alt="Chef Illustration" className="w-20 h-auto mb-4 pr-6" />
                <p>Access a clear and easy-to-use interface for you and your team.</p>
              </li>
            </ul>

          </div>
          
        </section>        
        <Footer />
      </main>
    </div>
  )
}

export default LandingPage

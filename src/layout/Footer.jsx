import { Link } from "react-router-dom";



function Footer() {
  return (
    <footer>
          <div className="bg-gray-100 py-6 h-full ">
            <div className="container mx-auto text-center">
              <p className="text-gray-600">© 2023 Brand. All rights reserved.</p>
              <Link to="/login" className="text-red-800 hover:text-red-600 font-semibold">Get Started</Link>
            </div>
          </div>
        </footer>
  )
}

export default Footer

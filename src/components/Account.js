import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router"; // Fixed navigation
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";

import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

import OrderHistory from "./common/OrderHistory";
//const user = AuthService.getCurrentUser();

const Account = ({cart,setCart}) => {

  const {user,logout} = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

    const bottomRef = useRef(null);
      const [bottomIsVisible, setBottomIsVisible] = useState(true);//bottom boserver interceptor reference trick
  

  // Reusable utility function to mask sensitive strings safely
  const maskString = (str, visibleCount = 3) => {
      if (!str) return "";
      if (str.length <= visibleCount) return str;
      const visiblePart = str.slice(0, visibleCount);
      const maskedPart = "•".repeat(str.length - visibleCount); // '•' looks cleaner than '*' for luxury brands
      return visiblePart + maskedPart;
  };

  useEffect(() => {
    
   

    setLoading(true);
    // 2. Función ficticia para simular o llamar a tu endpoint getOrders()
    const fetchOrders = async () => {
      try {
        setLoading(true);

        UserService.getOrders(user)
      .then((response) => {
        setOrders(response?.data?.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);

      })
         
      } catch (err) {
        console.error("Error al obtener las órdenes:", err);
        setError("No se pudieron cargar las órdenes.");

      } finally {
        
        setLoading(false);
      
      }
    };

    fetchOrders();

    
    const observer = new IntersectionObserver(
        ([entry]) => {
          // If the bottom sentinel is visible, hide the component. 
          // Otherwise, keep it visible.
          setBottomIsVisible(!entry.isIntersecting);
          console.log('the bottom of the page has been reached!!!!!!!!')
        },
        { 
          threshold: 0.1, // Triggers as soon as the bottom 10% of the sentinel enters
          rootMargin: "0px 0px 50px 0px" // Optional: Triggers 50px before reaching the exact bottom
        }
      );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };

    

  }, []);

  return (
    <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart} >
      <div className="max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide">
        
        {/* Page Header */}
        <header className="border-b border-zinc-100 pb-2 mb-4">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            My Account
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Customer Profile & History
          </p>
        </header>

        {user && (
          <div className="space-y-4">
            
            {/* Account Details Profile Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-zinc-100 pb-12">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                  Personal Details
                </h3>
              </div>
              <div className="md:col-span-2 space-y-3">
                <p className="text-lg font-light text-zinc-900">{user.fullname}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-zinc-600">
                  <span className="font-medium text-zinc-400 text-xs uppercase tracking-wider">Email</span>
                  <span className="font-mono text-zinc-500">{maskString(user.email, 4)}</span>
                </div>
                <p className="text-xs text-zinc-400 italic font-light pt-2">
                  "We value your privacy, keeping personal data footprint to a minimum."
                </p>
              </div>
            </section>

            {/* Order History Section */}
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
                Order History
              </h2>

              {loading ? (
                <p className="text-sm font-light text-zinc-400 animate-pulse">Loading  details...</p>
              ) : orders && orders.length > 0 ? (
                <div className="">
                  {/*
                  orders.map((row) => (
                    <div 
                      key={row.id} 
                      className="flex justify-between items-center py-5 group hover:bg-zinc-50/50 px-2 transition-colors duration-200"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-zinc-900 tracking-wider">
                          Order #000{row.id}
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {row.date_created ? row.date_created.split(" ")[0] : "Recent"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-light text-zinc-900">
                          ${parseFloat(row.total_amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                  */}
                  
                  <OrderHistory ordersData={orders} />
                  
                </div>
              ) : (
                <div className="border border-dashed border-zinc-200 rounded p-8 text-center">
                  <p className="text-sm font-light text-zinc-400 italic">
                    You have placed no orders with us... yet.
                  </p>
                </div>
              )}
            </section>
            
          </div>
        )}

        {/* Bottom Sentinel Trick */}
        <div 
          ref={bottomRef} 
          style={{ height: "1px", width: "100%", position: "absolute", bottom: 0 }} 
        /> 
      </div>
    </Template>
  );
};

export default Account;

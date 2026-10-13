import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router"; // Fixed navigation
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Template from "./common/template/Template";

const user = AuthService.getCurrentUser();

const Account = ({cart,setCart}) => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

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
    
    if (!user) {
      navigate("/login", { replace: true, state: { from: "/account" } });
      return;
    }

    setLoading(true);
    UserService.getOrders(user)
      .then((response) => {
        setOrders(response?.data?.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Cleaned up bottom observer trick if needed for infinite scroll/animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Reached page bottom.");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 50px 0px" }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [navigate]);

  return (
    <Template bottomIsVisible={bottomIsVisible} cart={cart} setCart={setCart} >
      <div className="max-w-3xl mx-auto mt-16 px-6 mb-24 font-sans antialiased text-zinc-800 tracking-wide">
        
        {/* Page Header */}
        <header className="border-b border-zinc-100 pb-8 mb-12">
          <h1 className="font-serif text-3xl font-light text-zinc-900 tracking-normal mb-1">
            My Account
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-light">
            Customer Profile & History
          </p>
        </header>

        {user && (
          <div className="space-y-16">
            
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
                <p className="text-sm font-light text-zinc-400 animate-pulse">Loading collection details...</p>
              ) : orders && orders.length > 0 ? (
                <div className="divide-y divide-zinc-100 border-t border-b border-zinc-100">
                  {orders.map((row) => (
                    <div 
                      key={row.id} 
                      className="flex justify-between items-center py-5 group hover:bg-zinc-50/50 px-2 transition-colors duration-200"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-zinc-900 tracking-wider">
                          Order #000{row.id}
                        </h4>
                        <p className="text-xs text-zinc-400 font-light">
                          {row.order_date ? row.order_date.split(" ")[0] : "Recent"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-light text-zinc-900">
                          ${parseFloat(row.total_amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
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
        <div ref={bottomRef} className="h-2 w-full invisible" />
      </div>
    </Template>
  );
};

export default Account;

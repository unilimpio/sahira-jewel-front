import React, { useState } from 'react';

// Ajustamos el componente para recibir las órdenes que te da tu API
export default function OrderHistory({ ordersData = [] }) {
  // Estado para rastrear qué orden está expandida (guarda el ID)
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Función para alternar el dropdown
  const toggleOrder = (orderId) => {
    setExpandedOrderId(prevId => prevId === orderId ? null : orderId);
  };

  // Helper para parsear de forma segura el string "order_detail" que envía tu API
  const parseOrderItems = (orderDetailString) => {
    try {
      return orderDetailString ? JSON.parse(orderDetailString) : [];
    } catch (error) {
      console.error("Error parseando order_detail:", error);
      return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2">
      
      
      <div className="space-y-2">
        {ordersData.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const items = parseOrderItems(order.order_detail);
          
          return (
            <div key={order.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden transition-all duration-200 shadow-sm">
              
              {/* Encabezado de la Orden (Fila Principal Clickeable) */}
              <button
                onClick={() => toggleOrder(order.id)}
                className=" relative w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 text-left hover:bg-zinc-50 focus:outline-none  transition-colors"
                aria-expanded={isExpanded}
              >
                <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 w-full items-center">

                  {/* Icono de Flecha con rotación animada */}
                    <div className="absolute right-1 top-3">
                        <svg
                            className={`w-5 h-5 text-zinc-600 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                  
                  {/* ID de la Orden */}
                  <div>
                    <span className="text-xs font-light text-zinc-600 block uppercase">Order ID</span>
                    <span className="text-xs font-semibold text-zinc-900">
                      #{order.id.padStart(6, '0')}
                    </span>
                  </div>
                  
                  {/* Fecha de Creación */}
                  <div>
                    <span className="text-xs font-light text-zinc-600 block uppercase">Order date:</span>
                    <span className="text-xs text-zinc-900 font-light">
                      {new Date(order.date_created).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                        
                  {/* Monto Total */}
                  <div>
                    <span className="text-xs font-light text-zinc-600 block uppercase">Total</span>
                    <span className="text-xs font-light text-gray-900">${parseFloat(order.total_amount).toFixed(2)}</span>
                  </div>

                  {/* Estado del Pedido e Icono */}
                  <div className=" ">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${
                      order.status === 'pendiente' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                    
                    
                    
                  </div>
                </div>
              </button>

              {/* Panel Desplegable (Detalles del Carrito) */}
              <div
                className={`transition-all duration-300 ease-in-out border-t border-zinc-300 ${
                  isExpanded ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                } overflow-hidden bg-gray-50`}
              >
                <div className="p-4 sm:px-6">
                  <h3 className="text-xs font-serif text-zinc-900 uppercase tracking-wider mb-3">Order Details:</h3>
                  
                  <div className="divide-y divide-zinc-200">
                    {items.map((item, idx) => (
                      <div key={idx} className="py-1 flex justify-between items-center text-sm ">
                        <div className="flex items-start space-x-3 ">
                          {/* Cantidad */}
                          <span className="inline-flex items-center justify-center bg-neutral-100 text-zinc-900 font-light rounded-md px-2 py-0.5 text-xs mt-0.5">
                            x{item.quantity}
                          </span>
                          
                          {/* Información del Producto */}
                          <div>
                            <p className="text-zinc-900 font-serif">{item.product?.name}
                                <br/>
                                <span className="text-[10px] text-zinc-600 font-mono">SKU: {item.product?.sku}</span>
                            </p>
                            
                          </div>
                        </div>
                        
                        {/* Precio */}
                        <p className="text-gray-900 font-light">
                            ${item.product?.price}
                            <span className="text-[10px] ml-2">USD / each</span>
                        </p>
                      </div>
                    ))}

                    {items.length === 0 && (
                      <p className="text-sm text-gray-500 py-2">No se encontraron detalles para esta orden.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductGrid({products}) {

    const backUrl = process.env.REACT_APP_BACK_URL;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const pathToImg = "assets/uploads/"
  
    return (
    <ul  className="grid grid-cols-2 p-0 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((item) => (
        <li key={item.product_name} className="relative">
          <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 dark:bg-gray-800 dark:focus-within:outline-indigo-500">
            <img
              alt=""
              src={item.product_imageSrc}
              className="pointer-events-none aspect-[10/7] rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/5 group-hover:opacity-75 dark:outline-white/10"
            />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {item.product_name}</span>
            </button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-white">
            {item.product_desc}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-400">{item.product_price}</p>
        </li>
      ))}
    </ul>
  )
}
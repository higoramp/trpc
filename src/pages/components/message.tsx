/**
 * This is a Next.js page.
 */
 export default function Message(props) {
   // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
   return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <button className="text-white px-4 w-auto h-8 bg-white-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-4 h-4 inline-block mr-1">
            <path fill="#666666" d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01
                                    l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932
                                    c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881
                                    L5.68,17.217z"></path>
          </svg>
          <span></span>
        </button>
    <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">{props.body}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">2 min ago</span>
    </div>
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
   );
 }
 
 const styles = {
   width: '100vw',
   height: '100vh',
   display: 'block',
   justifyContent: 'center',
   alignItems: 'center',
 };
 
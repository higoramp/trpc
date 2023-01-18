/**
 * This is a Next.js page.
 */
export interface MessageType {
  id?: string;
  body: string;
  image?: string | null;
  createdAt: string | null;
}

export default function Message(props: MessageType & { onDelete?: Function }) {
  const formatDate = (date: string) => {
    console.log('DATE', date)

    if(date) {
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(date));

    }
  }
  console.log('IMAGE NA MESSAGE', props.image)

  return (
    <div className="message flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
      {props.image && <img className="bg-blue-600 rounded-t-lg p-1.5" src={props.image}/>}
        <div className={`bg-blue-600 text-white p-3 rounded-bl-lg ${props.image ? '': 'rounded-tl-lg'} rounded-br-lg`}>
        
          <p className="text-sm">{props.body}</p>
        </div>
        {props.createdAt && <span className="text-xs text-gray-500 leading-none">{formatDate(props.createdAt)}</span>}
      </div>
      {props.id && (
        <button
          onClick={() => props.onDelete?.(props.id)}
          className="remove text-gray-500 hover:text-white px-2  w-auto h-6 bg-white-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        >
          <span className="hover:text-white-700 ">x</span>
        </button>
      )}
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  );
}

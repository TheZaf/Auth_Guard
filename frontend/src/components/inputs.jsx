
const Input = ({icon: Icon,...props}) => {
  return (
    <div className='relative mb-6'>
       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
       <Icon className='size-5 text-purple-900 '/>
       </div>
       <input
        {...props}
        className="w-full pl-10 pr-3 py-2  bg-opacity rounded-lg border border-gray-200
        focus:border-green-500 focus:ring-green-500 placeholder-black transition
          duration-200 text-black"
       />
    </div>
  )
}

export default Input

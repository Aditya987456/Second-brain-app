

interface inputprops {
  placeholder:string;
  reference?:any
  type?:string
}

export function Inputcomponent( {placeholder, reference, type="text" }: inputprops ) {
console.log('type =============== '+ type)
    return <div>

        <input
          ref={reference}
          type={type}
          placeholder={placeholder}
          //className="px-2 py-2 my-2 border rounded-sm"
          className="w-full px-4 py-2 border dark:bg-[#191919] dark:text-white border-[#E0E0E0] rounded focus:outline-none focus:ring-1 focus:ring-[#867eb5]"
            
           />

        </div>}
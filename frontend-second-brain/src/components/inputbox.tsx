

interface inputprops {
  placeholder:string;
  reference?:any
}

export function Inputcomponent( {placeholder, reference }: inputprops ) {

    return <div>

        <input
          ref={reference}
          type={"text"}
          placeholder={placeholder}
          className="px-2 py-2 my-2 border rounded-sm"
           />

        </div>}
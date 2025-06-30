export function Inputcomponent( {onChange, placeholder }: {onChange: () => void, placeholder?: string} ) {

    return <div>

        <input
          type={"text"}
          placeholder={placeholder}
          className="px-2 py-2 my-2 border rounded-sm"
          onChange={onChange} />

        </div>}
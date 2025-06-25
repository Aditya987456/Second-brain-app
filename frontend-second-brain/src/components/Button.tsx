interface ButtonProps{
    varient:"primary" | "secondary";
    size:"sm" | "md" | "lg";
    text:string;
    startIcon?:any;   //? : optional.
    endIcon?:any;
    onClick: ()=>void;
}

export const Button =(props:ButtonProps)=>{

    return <button></button>

}
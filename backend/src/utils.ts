//to generate the random id when sharing the contents...

export function random(length:number) {

    let RandomString='asdfghjkwertuuosnbchd5c7845448dbcbjsjbbxsbebcec4d45d4'
    let ans=""
    let len=RandomString.length;
    for(let i=0; i<length; i++){
        ans+=RandomString[ Math.floor(Math.random()*len) ]   //range is -> 0 to len.
    }

    return ans;
    
}


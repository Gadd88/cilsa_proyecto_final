export function checkAuth(){
    const token = localStorage.getItem('token')
    if(token && token.length){ 
        return true
    }else{
        return false
    }
}
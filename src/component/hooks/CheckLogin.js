import { redirect } from "react-router-dom";

export const CheckLogin = ()=>{

    alert("CheckLogin");

    const id = localStorage.getItem("id");
    if(id===null){

        return redirect("/")
    }
    
    return true;

}
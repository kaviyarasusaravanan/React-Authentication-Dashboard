import { getUserData, removeUserData } from "./Storage"

export const isAunthanticated=()=>{
    return getUserData()!=null?true:false;
}

export const logout=()=>{
    removeUserData();
}
"use client"
import { logout } from "@/actions/auth"

export default function SignOutButton(){
    return(
        <div>
            <button onClick={() => logout()}>Wyloguj się</button>
        </div>
    )
}
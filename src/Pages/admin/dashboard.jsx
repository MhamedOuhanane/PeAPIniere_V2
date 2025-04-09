import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <>
            <header className="bg-emerald-400 w-full h-5 px-2 ">

            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}
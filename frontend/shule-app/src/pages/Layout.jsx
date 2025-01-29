import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <>

        <div>
            <header>

                <nav className='navbar'>
                    <Link to="/" className='nav-left'>Home</Link>
                    <div className='nav-right'>
                        <p>ShuleSoft</p>
                    </div>
                </nav>

            </header>


            <main>
                <Outlet />
            </main>


        </div>

        </>
    );
};
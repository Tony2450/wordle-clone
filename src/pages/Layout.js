import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    const user = true;
    return (
        <>
            <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/wordle-clone">Wordle!</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="/rules">Rules</Link>
                            </li>

                            {user ? <li class="nav-item">
                                <Link class="nav-link" to="/wordle-clone">Play Wordle!</Link>
                            </li> :
                                <li class="nav-item">
                                    <Link class="nav-link" to="/register">Register</Link>
                                </li>}
                            {user ? <li class="nav-item">
                                <Link class="nav-link" to="/logout">Logout</Link>
                            </li> : <li class="nav-item">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <Outlet />
            </div>
        </>
    )
}

export default Layout;
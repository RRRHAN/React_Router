import Utama from "./Components/utama"
import { Link } from "react-router-dom"
import "./App.css"

function App() {
	return (
		<div>
			<nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
				<a class='navbar-brand' href='#'>
					Navbar
				</a>
				<button
					class='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>
				<div class='collapse navbar-collapse' id='navbarNav'>
					<ul class='navbar-nav'>
						<Link to='/' class='nav-item active'>
							<a class='nav-link text-light' href='#'>
								Beranda <span class='sr-only'>(current)</span>
							</a>
						</Link>
						<Link to='/tentangsaya' class='nav-item'>
							<a class='nav-link text-light' href='#'>
								Tentang Saya
							</a>
						</Link>
						<Link to='/karya' class='nav-item'>
							<a class='nav-link text-light' href='#'>
								Karya
							</a>
						</Link>
						<Link to='/kontak' class='nav-item'>
							<a class='nav-link text-light' href='#'>
								Kontak
							</a>
						</Link>
						<Link to='/galeri' class='nav-item'>
							<a class='nav-link text-light' href='#'>
								Galeri
							</a>
						</Link>
						<Link to='/cart' class='nav-item'>
							<a class='nav-link text-light' href='#'>
								Cart
							</a>
						</Link>
					</ul>
				</div>
			</nav>
			<Utama />
		</div>
	)
}

export default App

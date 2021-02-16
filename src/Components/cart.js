import React, { Component } from "react"
import trash from "../Trash.svg"
import cart_svg from "../cart.svg"

export class cart extends Component {
	constructor() {
		super()
		this.state = {
			cart: [], // untuk menyimpan list cart
			user: "", // untuk menyimpan data nama user
			total: 0, // untuk menyimpan data total belanja
		}
	}
	TambahBarang = (item) => {
		let tempCart = this.state.cart,
			index = tempCart.indexOf(item)
		tempCart[index].jumlahBeli++
		this.setState({ cart: tempCart })
		localStorage.setItem("cart", JSON.stringify(tempCart))
		this.hitungTotal()
	}
	KurangiBarang = (item) => {
		let tempCart = this.state.cart,
			index = tempCart.indexOf(item)
		console.log(tempCart[index])
		if (
			tempCart[index].jumlahBeli == 1 &&
			window.confirm(
				`Anda Yakin Ingin Menghapus ${item.judul} Dari Cart Belanja?`
			)
		) {
			tempCart.splice(index, 1)
		} else if (tempCart[index].jumlahBeli != 1) {
			tempCart[index].jumlahBeli--
		}
		this.setState({ cart: tempCart })
		localStorage.setItem("cart", JSON.stringify(tempCart))
		this.hitungTotal()
	}
	hapusBarang = (item) => {
		if (
			window.confirm(
				`Anda Yakin Ingin Menghapus ${item.judul} Dari Cart Belanja?`
			)
		) {
			let tempCart = this.state.cart,
				index = tempCart.indexOf(item)
			tempCart[index].jumlahBeli--
			tempCart.splice(index, 1)
			this.setState({ cart: tempCart })
			localStorage.setItem("cart", JSON.stringify(tempCart))
			this.hitungTotal()
		}
	}
	hitungTotal = () => {
		let totalHarga = 0
		this.state.cart.map((item) => {
			totalHarga += item.harga * item.jumlahBeli
		})
		this.setState({ total: totalHarga })
	}
	Price = (price) => {
		let arrPrice = String(price).match(/-?\d/g).map(Number).reverse(),
			loop = 0,
			res = ""
		price = []
		arrPrice.forEach((element) => {
			if (loop === 3) {
				price.push(".")
				loop = 0
			}
			price.push(element)
			loop++
		})
		price.reverse()
		price.forEach((element) => {
			res += element.toString()
		})
		return res
	}
	initCart = () => {
		// memanggil data cart pada localStorage
		let tempCart = []
		if (localStorage.getItem("cart") !== null) {
			tempCart = JSON.parse(localStorage.getItem("cart"))
		}

		// memanggil data user pada localStorage
		let userName = localStorage.getItem("user")

		// kalkulasi total harga
		let totalHarga = 0
		tempCart.map((item) => {
			totalHarga += item.harga * item.jumlahBeli
		})

		// memasukkan data cart, user, dan total harga pada state
		this.setState({
			cart: tempCart,
			user: userName,
			total: totalHarga,
		})
	}
	setUser = () => {
		// cek eksistensi dari session storage
		if (localStorage.getItem("user") === null) {
			// kondisi jika session storage "user" belum dibuat
			let prompt = window.prompt("Masukkan Nama Anda", "")
			if (prompt === null || prompt === "") {
				// jika user tidak mengisikan namanya
				this.setUser()
			} else {
				// jika user telah mengisikan namanya

				// simpan nama user ke session storage
				localStorage.setItem("user", prompt)

				// simpan nama user ke state.user
				this.setState({ user: prompt })
			}
		} else {
			// kondisi saat session storage "user" telah dibuat

			// akses nilai dari session storage "user"
			let name = localStorage.getItem("user")
			this.setState({ user: name })
		}
	}
	componentDidMount() {
		this.setUser()
		this.initCart()
	}

	render() {
		return (
			<div className='container'>
				{(() => {
					if (this.state.cart.length != 0) {
						return (
							<div className='card col-12 mt-2'>
								<div className='card-header bg-primary text-white mt-2'>
									<h4>Data Keranjang Belanja</h4>
								</div>

								<div className='card-body'>
									<h5 className='text-primary'>Nama User: {this.state.user}</h5>

									<table className='table table-bordered text-center align-middle'>
										<thead>
											<tr className='bg-primary'>
												<th>
													<img src={trash} alt='' width='30rem' />
												</th>
												<th>Nama Item</th>
												<th>Harga</th>
												<th>Qty</th>
												<th>Total</th>
											</tr>
										</thead>

										<tbody>
											{this.state.cart.map((item, index) => (
												<tr key={index}>
													<td>
														<button
															className='btn btn-danger'
															onClick={() => this.hapusBarang(item)}
														>
															<img src={trash} alt='' width='30rem' />
														</button>
													</td>
													<td className='align-middle'>{item.judul}</td>
													<td className='align-middle'>
														Rp {this.Price(item.harga)}
													</td>
													<td className='align-middle'>
														<div className='row'>
															<div className='col-3'>
																<button
																	type='button'
																	className='btn btn-danger px-3'
																	onClick={() => this.KurangiBarang(item)}
																>
																	-
																</button>
															</div>
															<div className='col-5 border text-center'>
																{item.jumlahBeli}
															</div>
															<div className='col-3'>
																<button
																	type='button'
																	className='btn btn-success px-3'
																	onClick={() => this.TambahBarang(item)}
																>
																	+
																</button>
															</div>
														</div>
													</td>
													<td className='align-middle'>
														Rp {this.Price(item.harga * item.jumlahBeli)}
													</td>
												</tr>
											))}
										</tbody>
									</table>

									<h4 className='text-danger'>
										Total Harga: Rp {this.Price(this.state.total)}
									</h4>
								</div>
							</div>
						)
					}
					return (
						<div className='col-12'>
							<h4 className='text-info my-2'>
								Nama Pengguna: {this.state.user}
							</h4>
							<h3 className='m-3 text-center'>Keranjang Belanja Anda Kosong</h3>
							<div
								style={{
									backgroundImage: `url(${cart_svg})`,
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									height: "55vh",
									backgroundPosition: "center",
								}}
							></div>
						</div>
					)
				})()}
			</div>
		)
	}
}

export default cart

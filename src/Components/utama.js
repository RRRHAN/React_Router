import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import Beranda from "./beranda"
import tentangsaya from "./tentangsaya"
import karya from "./karya"
import kontak from "./kontak"
import galeri from "./galeri"
import cart from "./cart"

const utama = () => (
	<Switch>
		<Route exact path='/' component={Beranda} />
		<Route path='/tentangsaya' component={tentangsaya} />
		<Route path='/karya' component={karya} />
		<Route path='/kontak' component={kontak} />
		<Route path='/galeri' component={galeri} />
		<Route path='/cart' component={cart} />
	</Switch>
)

export default utama

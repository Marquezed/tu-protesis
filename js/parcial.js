'use strict';


const d = document;
const boxTotal = d.getElementById('boxTotal');
const boxCantidad = d.getElementById('boxCantidad');
const boxTotal2 = d.getElementById('boxTotal2');
const boxCantidad2 = d.getElementById('boxCantidad2');
const miniCarrito = d.getElementById('minicarrito');
const carrito1 = d.getElementById('carrito1');
const productos = d.querySelector('#productos');
const catTitle = d.querySelector('.catalogo-title');
const carritoFlotante = d.getElementById('flotante');
const cartTable = d.getElementById('cartTable');
const checkout = d.getElementById('checkout');

const palCheckout = d.getElementById('testButton');

let carrito = {
	productos: [],
	cantidad: [],
	cantidadGeneral: 0,
	total: 0,
};

if(localStorage.carrito){
    carrito = JSON.parse(localStorage.carrito);

}else{
    localStorage.carrito = JSON.stringify(carrito);
}

window.onload = function() {
	boxCantidad2.innerText = carrito.cantidadGeneral;
	boxTotal2.innerText = carrito.total;
  };


let valorTotal = 0;



let aProductos = [
	{
		id: 1,
		imagen: '9.jpg',
		nombre: 'Audifonos',
		descripcion: 'Audifonos con frecuencias ajustables.',
		precio: 4000,
	},
	{	id: 2,
		imagen: '10.jpg',
		nombre: 'Mano Robotica',
		descripcion: 'Mano robotica con sensores dinamicos.',
		precio: 5000,
	},
	{	id: 3,
		imagen: '11.jpg',
		nombre: 'Mano de Plastico',
		descripcion: 'Mano tematica de plastico.',
		precio: 3500,
	},
	{	id: 4,
		imagen: '12.jpg',
		nombre: 'Brazo ',
		descripcion: 'Brazo completo, dinamico y flexible',
		precio: 7000,
	},
	{	id: 5,
		imagen: '13.jpg',
		nombre: 'Mano de Plastico',
		descripcion: 'Mano tematica de plastico.',
		precio: 4520,
	},
	{	id: 6,
		imagen: '14.jpg',
		nombre: 'Dedos dinamicos',
		descripcion: 'Dedos de plastico dinamico',
		precio: 5000,
	},
	{	id: 7,
		imagen: '15.jpg',
		nombre: 'Mano Robotica',
		descripcion: 'Mano robotica con sensores dinamicos.',
		precio: 6000,
	},
	{	id: 8,
		imagen: '16.jpg',
		nombre: 'Mienbro superior completo',
		descripcion: 'Brazo y mano dimanica con sensores',
		precio:7000,
	},
	{	id: 9,
		imagen: '17.png',
		nombre: 'Mano Robotica',
		descripcion: 'Mano robotica con sensores dinamicos.',
		precio: 8500,
	},
];


for (let producto of aProductos){
	
	let pCard = d.createElement('div');

	let pBoxAmpliar = d.createElement('div');
	pBoxAmpliar.className = 'div-img-title';
		pCard.appendChild(pBoxAmpliar);

	let pImg = d.createElement('img');
		pImg.src = `img/${producto.imagen}`;
		pImg.alt = producto.descripcion;
		pBoxAmpliar.appendChild(pImg);
	
	let pName = d.createElement('h3');
		pName.innerText = producto.nombre;
		pBoxAmpliar.appendChild(pName);

	let pPrice = d.createElement('p');
		pPrice.className = 'catalogo-price';
		pPrice.innerText = `$${producto.precio}`;
		pCard.appendChild(pPrice);

	let btnBox = d.createElement('div');
		btnBox.className = 'btn-box';
		pCard.appendChild(btnBox);

	let removeBtn = d.createElement('button');
		removeBtn.innerText = 'Quitar';
		removeBtn.className = 'remove-btn';
		removeBtn.dataset.id = producto.id;
		removeBtn.dataset.precio = producto.precio;
		btnBox.appendChild(removeBtn);

	let addBtn = d.createElement('button');
		addBtn.innerText = 'Agregar';
		addBtn.className = 'add-btn';
		addBtn.dataset.id = producto.id;
		addBtn.dataset.precio = producto.precio;
		btnBox.appendChild(addBtn);



		addBtn.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice == -1) {
				carrito.productos.push(id);
				carrito.cantidad.push(1);
				carrito.cantidadGeneral++;

			} else {
				carrito.cantidad[indice]++;
				carrito.cantidadGeneral++;
			}
			

			carrito.total = parseInt(carrito.total) + precio;
			boxCantidad2.innerText = carrito.cantidadGeneral;
			boxTotal2.innerText = carrito.total;
			
			localStorage.carrito= JSON.stringify(carrito);
			
			console.log(carrito);
		}


		removeBtn.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice !== -1) {
				if(carrito.cantidad[indice] > 0){
					carrito.cantidad[indice]--;
					carrito.cantidadGeneral--;
					carrito.total = parseInt(carrito.total) - precio;
					boxCantidad2.innerText = carrito.cantidadGeneral;
					boxTotal2.innerText = carrito.total;

					if (carrito.cantidad[indice] == 0) {
						delete carrito.productos[indice];
					}

					localStorage.carrito= JSON.stringify(carrito);
				}
				

			}

			console.log(carrito);
			
		}

	pBoxAmpliar.addEventListener('click', (e) => {
		let modalProducto = d.createElement('div');
		modalProducto.id = 'modal-producto';
		modalProducto.className = 'modal';
		d.querySelector('body').appendChild(modalProducto);

		let containerModalP = d.createElement('div');
		containerModalP.className = 'container-modal-p';
		
		let imgPM = d.createElement('img');
			imgPM.src = `img/${producto.imagen}`;
			imgPM.alt = producto.descripcion;
		
		let namePM = d.createElement('h3');
			namePM.innerText = producto.nombre;
		
		let descPM = d.createElement('p');
			descPM.innerText = producto.descripcion;
	
		let pricePM = d.createElement('p');
			pricePM.className = 'precio-modal-p';
			pricePM.innerText = `$${producto.precio}`;
	
		let btnBoxPM = d.createElement('div');
			btnBoxPM.className = 'btn-box';
	
		let removeBtnPM = d.createElement('button');
			removeBtnPM.innerText = 'Remover';
			removeBtnPM.className = 'remove-btn';
			removeBtnPM.dataset.id = producto.id;
			removeBtnPM.dataset.precio = producto.precio;
			btnBoxPM.appendChild(removeBtnPM);

		let addBtnPM = d.createElement('button');
			addBtnPM.innerText = 'Agregar';
			addBtnPM.className = 'add-btn';
			addBtnPM.dataset.id = producto.id;
			addBtnPM.dataset.precio = producto.precio;
			btnBoxPM.appendChild(addBtnPM);

		let closeBtnPM = d.createElement('a');
			closeBtnPM.innerText = 'X';
			closeBtnPM.href = "#";
			closeBtnPM.addEventListener('click', cerrarModal);


		containerModalP.appendChild(imgPM);
		containerModalP.appendChild(namePM);
		containerModalP.appendChild(descPM);
		containerModalP.appendChild(pricePM);
		containerModalP.appendChild(btnBoxPM);
		containerModalP.appendChild(closeBtnPM);
		modalProducto.appendChild(containerModalP);


		addBtnPM.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice == -1) {
				carrito.productos.push(id);
				carrito.cantidad.push(1);
				carrito.cantidadGeneral++;

			} else {
				carrito.cantidad[indice]++;
				carrito.cantidadGeneral++;
			}
			

			carrito.total = parseInt(carrito.total) + precio;
			boxCantidad2.innerText = carrito.cantidadGeneral;
			boxTotal2.innerText = carrito.total;
			
			localStorage.carrito= JSON.stringify(carrito);
			
			console.log(carrito);
		}

		removeBtnPM.onclick = function () {
			let id = parseInt(this.dataset.id);
			let precio = parseInt(this.dataset.precio);
			let indice = carrito.productos.indexOf(id);

			if (indice !== -1) {
				if(carrito.cantidad[indice] > 0){
					carrito.cantidad[indice]--;
					carrito.cantidadGeneral--;
					carrito.total = parseInt(carrito.total) - precio;
					boxCantidad2.innerText = carrito.cantidadGeneral;
					boxTotal2.innerText = carrito.total;

					if (carrito.cantidad[indice] == 0) {
						delete carrito.productos[indice];
					}

					localStorage.carrito= JSON.stringify(carrito);
				}
				

			}

			console.log(carrito);
			
		}

	
		})

		

productos.appendChild(pCard);
}



//MODAL 

carritoFlotante.addEventListener('click', (e) => {

	let modalCarrito = d.createElement('div');
	modalCarrito.id = 'modal-carrito';
	modalCarrito.className = 'modal';
	modalCarrito.style.zIndex = '3000';
	d.querySelector('body').appendChild(modalCarrito);

	let table = d.createElement('table');
	modalCarrito.appendChild(table);

	let tBody = d.createElement('tbody');
	table.appendChild(tBody);

	let closeBtnCM = d.createElement('a');
		closeBtnCM.innerText = 'X';
		closeBtnCM.href = "#";
		closeBtnCM.addEventListener('click', cerrarModal);
		modalCarrito.appendChild(closeBtnCM);

		for (let i = 0; i < carrito.productos.length; i++) {
			let productoId = carrito.productos[i];
		
			for (let item of aProductos) {
				if (item.id == productoId) {

					if (carrito.cantidad[i] >= 1){

					let tr = d.createElement('tr');
					tr.className = 'shoppingCartItem';
					tBody.appendChild(tr);

					let tdRemoveProductBtn = d.createElement('td');
				
					tdRemoveProductBtn.setAttribute('onclick', 'return this.parentNode.remove()');

					tr.appendChild(tdRemoveProductBtn);

					
					let removeProductBtn = d.createElement('button');
					removeProductBtn.innerText = 'x';
					tdRemoveProductBtn.appendChild(removeProductBtn);
					
					let tdImg = d.createElement('td');
					tr.appendChild(tdImg);

					let img = d.createElement('img');
					img.src = `img/${item.imagen}`;
					img.alt = item.descripcion;
					tdImg.appendChild(img);

					let tdNombre = d.createElement('td');
					tr.appendChild(tdNombre);

					let nombre = d.createElement('h3');
					nombre.innerText = item.nombre;
					tdNombre.appendChild(nombre);

					let tdPrecio = d.createElement('td');
					tr.appendChild(tdPrecio);

					let precio = d.createElement('span');
					precio.innerText = `$${item.precio}`;
					tdPrecio.appendChild(precio);

					let tdAdd = d.createElement('td');
					tr.appendChild(tdAdd);

					let addBtn = d.createElement('button');
					addBtn.innerText = '+';
					tdAdd.appendChild(addBtn);

					let tdCantidad = d.createElement('td');
					tr.appendChild(tdCantidad);

					let tdRemove = d.createElement('td');
					tr.appendChild(tdRemove);

					let removeBtn = d.createElement('button');
					removeBtn.innerText = '-';
					tdRemove.appendChild(removeBtn);

					let cantidad = d.createElement('span');
					cantidad.innerText = `${carrito.cantidad[i]} und.`;
					tdCantidad.appendChild(cantidad);

					let tdSubtotal = d.createElement('td');
					tr.appendChild(tdSubtotal);

					let subtotal = d.createElement('span');
					subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
					tdSubtotal.appendChild(subtotal);


					/**FUNCIONES DE LOS BOTONES*/

					removeProductBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
						

						if (indice !== -1) {
							if(carrito.cantidad[indice] > 0){
								carrito.cantidadGeneral = carrito.cantidadGeneral - carrito.cantidad[indice];
								carrito.total = parseInt(carrito.total) - (precio * carrito.cantidad[indice]);
								boxCantidad2.innerText = carrito.cantidadGeneral;
								boxTotal2.innerText = carrito.total;
					
								delete carrito.productos[indice];
								delete carrito.cantidad[indice];
								console.log(`cantidad general: ${carrito.cantidadGeneral}`);
								localStorage.carrito = JSON.stringify(carrito);
								labelTotal.innerText = `Total: $${carrito.total}`;
							}
							carritoVacio();
						console.log(carrito);
						
					}
					}

					addBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
			
						if (indice == -1) {
							carrito.productos.push(id);
							carrito.cantidad.push(1);
							carrito.cantidadGeneral++;
							
			
						} else {
							carrito.cantidad[indice]++;
							carrito.cantidadGeneral++;
						}
						
			
						carrito.total = parseInt(carrito.total) + precio;
						boxCantidad2.innerText = carrito.cantidadGeneral;
						boxTotal2.innerText = carrito.total;
						labelTotal.innerText = `Total: $${carrito.total}`;
						cantidad.innerText = `${carrito.cantidad[i]} und.`;
						subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
						
						localStorage.carrito= JSON.stringify(carrito);
						
						console.log(carrito);
					}

					removeBtn.onclick = function () {
						let id = parseInt(item.id);
						let precio = parseInt(item.precio);
						let indice = carrito.productos.indexOf(id);
						let labelTotal = d.querySelector('.total-carrito');
			
						if (indice !== -1) {
							if(carrito.cantidad[indice] > 1){
								carrito.cantidad[indice]--;
								carrito.cantidadGeneral--;
								carrito.total = parseInt(carrito.total) - precio;
								boxCantidad2.innerText = carrito.cantidadGeneral;
								boxTotal2.innerText = carrito.total;

								labelTotal.innerText = `Total: $${carrito.total}`;
								cantidad.innerText = `${carrito.cantidad[i]} und.`;
								subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
			
								localStorage.carrito= JSON.stringify(carrito);
							}
							
			
						}
			
						console.log(carrito);
						
					}

					

					}
				}
			}
		}

		
	let vaciadoMsj = d.createElement('div');
	vaciadoMsj.innerHTML = 'Haz vaciado el carrito';
	carritoVacio();
	

			

	const divTotal = d.createElement('div');
	modalCarrito.appendChild(divTotal);
	divTotal.className = 'total-box-carrito';

	let labelTotal = d.createElement('span');
	labelTotal.innerText = `Total: $${carrito.total}`;
	labelTotal.className = 'total-carrito';
	divTotal.appendChild(labelTotal);

	const btnBoxCarrito = d.createElement('div');
	modalCarrito.appendChild(btnBoxCarrito);
	btnBoxCarrito.className = 'btn-box-carrito';


	const vaciar = d.createElement('button');
	vaciar.innerText = 'Vaciar Carrito';
	vaciar.className = 'btn-vaciar';
	btnBoxCarrito.appendChild(vaciar);
	vaciar.onclick = function () {
		localStorage.clear();
		location.reload();
		productos.appendChild(vaciadoMsj);
	}

	function carritoVacio(){
		if (carrito.total == 0){
			console.log('HOLA ESTOY DENTRO DE CARRITO VACIO');
			const carritoVacio = d.createElement('span');
			carritoVacio.className = 'carrito-vacio';
			carritoVacio.innerText = `¡No hay productos en tu carrito!`;
			modalCarrito.appendChild(carritoVacio);
		

			const removeBtnBox = document.querySelector(".btn-box-carrito");
			removeBtnBox.parentNode.removeChild(removeBtnBox);

			const removeBoxTotal = document.querySelector(".total-box-carrito");
			removeBoxTotal.parentNode.removeChild(removeBoxTotal);
		} else {
			console.log(`${carrito.total}`);
	  }
	}

	let checkoutBtn = d.createElement('button');
	checkoutBtn.innerText = 'Iniciar Compra';
	checkoutBtn.className = 'checkout-btn';
	btnBoxCarrito.appendChild(checkoutBtn);

	checkoutBtn.addEventListener('click', (e) => {

		productos.remove();
		catTitle.remove();
		document.querySelector('.modal').remove();
		carritoFlotante.remove();

		let checkoutContainer = d.createElement('div');
		checkoutContainer.id = 'checkout-container';
		checkout.appendChild(checkoutContainer);
	
	
	
		let columnsWrap = d.createElement('div');
		columnsWrap.id = 'wrap-columns';
		checkoutContainer.appendChild(columnsWrap);
	
		let div1 = d.createElement('div');
		div1.id = 'div1';
		columnsWrap.appendChild(div1);
	
		let facturacionBox = d.createElement('div');
		div1.appendChild(facturacionBox);
	
		let factTitle = d.createElement('h3');
		factTitle.innerText = 'Datos de factura y Envio';
		facturacionBox.appendChild(factTitle);
	
		let factForm =d.createElement('form');
		factForm.onsubmit = continuar;
		facturacionBox.appendChild(factForm);
	
		let nameL = d.createElement('label');
		nameL.style.display = 'none';
		nameL.innerText = 'Nombre';
		nameL.setAttribute('for', 'nombre');
		factForm.appendChild(nameL);
	
		let nameI = d.createElement('input');
		nameI.setAttribute('name', 'nombre');
		nameI.setAttribute('type', 'text');
		
		nameI.placeholder = 'Nombre';
		factForm.appendChild(nameI);
	
		let lastnameL = d.createElement('label');
		lastnameL.style.display = 'none';
		lastnameL.innerText = 'Apellido';
		lastnameL.setAttribute('for', 'apellido');
		factForm.appendChild(lastnameL);
	
		let lastnameI = d.createElement('input');
		lastnameI.setAttribute('name', 'apellido');
		lastnameI.setAttribute('type', 'text');
		
		lastnameI.placeholder = 'Apellido';
		factForm.appendChild(lastnameI);
	
		let phoneL = d.createElement('label');
		phoneL.style.display = 'none';
		phoneL.innerText = 'Teléfono';
		phoneL.setAttribute('for', 'telefono');
		factForm.appendChild(phoneL);
	
		let phoneI = d.createElement('input');
		phoneI.setAttribute('name', 'telefono');
		phoneI.setAttribute('type', 'tel');
		
		phoneI.placeholder = 'Teléfono';
		factForm.appendChild(phoneI);
	
		let emailL = d.createElement('label');
		emailL.style.display = 'none';
		emailL.innerText = 'Correo electrónico';
		emailL.setAttribute('for', 'correo');
		factForm.appendChild(emailL);
	
		let emailI = d.createElement('input');
		emailI.setAttribute('name', 'correo');
		emailI.setAttribute('type', 'email');
		
		emailI.placeholder = 'Correo electrónico';
		factForm.appendChild(emailI);
	
		let streetL = d.createElement('label');
		streetL.style.display = 'none';
		streetL.innerText = 'Calle y número';
		streetL.setAttribute('for', 'calle');
		factForm.appendChild(streetL);
	
		let streetI = d.createElement('input');
		streetI.setAttribute('name', 'calle');
		streetI.setAttribute('type', 'text');
		
		streetI.placeholder = 'Calle y número';
		factForm.appendChild(streetI);
	
		let deptoL = d.createElement('label');
		deptoL.style.display = 'none';
		deptoL.innerText = 'Departamento';
		deptoL.setAttribute('for', 'departamento');
		factForm.appendChild(deptoL);
	
		let deptoI = d.createElement('input');
		deptoI.setAttribute('name', 'departamento');
		deptoI.setAttribute('type', 'text');
		deptoI.placeholder = 'Departamento (Opcional)';
		factForm.appendChild(deptoI);
	
		let barrioL = d.createElement('label');
		barrioL.style.display = 'none';
		barrioL.innerText = 'Barrio';
		barrioL.setAttribute('for', 'barrio');
		factForm.appendChild(barrioL);
	
		let barrioI = d.createElement('input');
		barrioI.setAttribute('name', 'barrio');
		barrioI.setAttribute('type', 'text');
		barrioI.placeholder = 'Barrio (Opcional)';
		factForm.appendChild(barrioI);
	
		let cityL = d.createElement('label');
		cityL.style.display = 'none';
		cityL.innerText = 'Ciudad';
		cityL.setAttribute('for', 'ciudad');
		factForm.appendChild(cityL);
	
		let cityI = d.createElement('input');
		cityI.setAttribute('name', 'ciudad');
		cityI.setAttribute('type', 'text');
		
		cityI.placeholder = 'Ciudad';
		factForm.appendChild(cityI);
	
		let cpL = d.createElement('label');
		cpL.style.display = 'none';
		cpL.innerText = 'Código Postal';
		cpL.setAttribute('for', 'cp');
		factForm.appendChild(cpL);
	
		let cpI = d.createElement('input');
		cpI.setAttribute('name', 'cp');
		cpI.setAttribute('type', 'number');
		
		cpI.placeholder = 'Código Postal';
		factForm.appendChild(cpI);
	
		let provinciaL = d.createElement('label');
		provinciaL.style.display = 'none';
		provinciaL.innerText = 'Provincia';
		provinciaL.setAttribute('for', 'provincia');
		factForm.appendChild(provinciaL);
	
		let provinciaI = d.createElement('input');
		provinciaI.setAttribute('name', 'provincia');
		provinciaI.setAttribute('type', 'text');
	
		provinciaI.placeholder = 'Provincia';
		factForm.appendChild(provinciaI);
	
		
	
	
	
		let datosSubmit = d.createElement('input');
		datosSubmit.setAttribute('type', 'submit');
		datosSubmit.setAttribute('value', 'Continuar');
		factForm.appendChild(datosSubmit);
	
	
		let div2 = d.createElement('div');
		div2.id = 'div2';
		columnsWrap.appendChild(div2);
	
		let ordenBox = d.createElement('div');
		ordenBox.className = 'orden-box';
		div2.appendChild(ordenBox);
	
		let ordenTitle = d.createElement('h3');
		ordenTitle.innerText = 'Tu Orden';
		ordenBox.appendChild(ordenTitle);
	
		let table = d.createElement('table');
		ordenBox.appendChild(table);
	
		let tBody = d.createElement('tbody');
		table.appendChild(tBody);
	
	
			for (let i = 0; i < carrito.productos.length; i++) {
				let productoId = carrito.productos[i];
				
				for (let item of aProductos) {
					if (item.id == productoId) {
						let tr = d.createElement('tr');
						tBody.appendChild(tr);
	
						let tdImg = d.createElement('td');
						tr.appendChild(tdImg);
	
						let img = d.createElement('img');
						img.src = `img/${item.imagen}`;
						img.alt = item.descripcion;
						tdImg.appendChild(img);
	
						let tdNombre = d.createElement('td');
						tr.appendChild(tdNombre);
	
						let nombre = d.createElement('h4');
						nombre.innerText =`${item.nombre} x  ${carrito.cantidad[i]}`;
						tdNombre.appendChild(nombre);
	
						let tdCantidad = d.createElement('td');
						tr.appendChild(tdCantidad);
	
						let tdSubtotal = d.createElement('td');
						tr.appendChild(tdSubtotal);
	
						let subtotal = d.createElement('span');
						subtotal.innerText = `$${carrito.cantidad[i] * item.precio}`;
						tdSubtotal.appendChild(subtotal);
					
					}
				}
			}
	
	
	
			let tr = d.createElement('tr');
			tr.className = 'trTotal';
			tBody.appendChild(tr);
	
			let td1 = d.createElement('td');
			tr.appendChild(td1);
			let td2 = d.createElement('td');
			tr.appendChild(td2);
	
			let td4 = d.createElement('td');
			tr.appendChild(td4);
			let labelTotal = d.createElement('span');
			labelTotal.innerText = 'Total:';
			td1.appendChild(labelTotal);
	
			let tdTotal = d.createElement('td');
			tr.appendChild(tdTotal);
			let total = d.createElement('span');
			total.innerText = `$${carrito.total}`;
			tdTotal.appendChild(total);

			let btnVolver = d.createElement('button');
			btnVolver.innerHTML = '<span class="chevron">&#8249;</span> Volver al catálogo';
			btnVolver.className = 'btn-volver';
			div2.appendChild(btnVolver);

			btnVolver.addEventListener('click', (e) => {
				location.reload();
			});
	
			
	
			function continuar(){
				factForm.remove();
	
				factTitle.innerText = 'Medios de Pago';
	
				let tarjetaBox = d.createElement('div');
				tarjetaBox.id = 'tarjeta-box';
				div1.appendChild(tarjetaBox);
	
				let tbTitle = d.createElement('h4');
				tbTitle.innerHTML = 'Tarjeta de crédito y débito';
				tarjetaBox.appendChild(tbTitle);

				const formTarjeta = d.createElement('form');
					formTarjeta.onsubmit = graciasTarjeta;
					tarjetaBox.appendChild(formTarjeta);
	
					let numTarjetaL = d.createElement('label');
					numTarjetaL.style.display = 'none';
					numTarjetaL.innerText = 'Número de tarjeta';
					numTarjetaL.setAttribute('for', 'numero-tarjeta');
					formTarjeta.appendChild(numTarjetaL);
	
					let numTarjetaI = d.createElement('input');
					numTarjetaI.setAttribute('name', 'numero-tarjeta');
					numTarjetaI.setAttribute('type', 'text');
					numTarjetaI.setAttribute('required', '');
					numTarjetaI.placeholder = 'Número de tarjeta';
					formTarjeta.appendChild(numTarjetaI);
	
					let titularL = d.createElement('label');
					titularL.style.display = 'none';
					titularL.innerText = 'Titular de la tarjeta';
					titularL.setAttribute('for', 'titular');
					formTarjeta.appendChild(titularL);
	
					let titularI = d.createElement('input');
					titularI.setAttribute('name', 'titular');
					titularI.setAttribute('type', 'text');
					titularI.setAttribute('required', '');
					titularI.placeholder = 'Titular de la tarjeta';
					formTarjeta.appendChild(titularI);
	
					let vencimientoL = d.createElement('label');
					vencimientoL.style.display = 'none';
					vencimientoL.innerText = 'Vencimiento de la tarjeta';
					vencimientoL.setAttribute('for', 'vencimiento');
					formTarjeta.appendChild(vencimientoL);
	
					let vencimientoI = d.createElement('input');
					vencimientoI.setAttribute('name', 'vencimiento');
					vencimientoI.setAttribute('type', 'text');
					vencimientoI.setAttribute('required', '');
					vencimientoI.placeholder = 'Vencimiento (MM/AA)';
					formTarjeta.appendChild(vencimientoI);
	
					let cvvL = d.createElement('label');
					cvvL.style.display = 'none';
					cvvL.innerText = 'Código de la tarjeta';
					cvvL.setAttribute('for', 'cvv');
					formTarjeta.appendChild(cvvL);
	
					let cvvI = d.createElement('input');
					cvvI.setAttribute('name', 'cvv');
					cvvI.setAttribute('type', 'text');
					cvvI.setAttribute('required', '');
					cvvI.placeholder = 'CVV';
					formTarjeta.appendChild(cvvI);
	
				
	
					let tarjetaSubmit = d.createElement('input');
					tarjetaSubmit.setAttribute('type', 'submit');
					tarjetaSubmit.setAttribute('value', 'REALIZAR PEDIDO');
					formTarjeta.appendChild(tarjetaSubmit);
	
	
				function graciasTarjeta(){
						checkout.remove();
	
					let modalGraciasTarjeta = d.createElement('div');
					modalGraciasTarjeta.id = 'modal-gracias-tarjeta';
					modalGraciasTarjeta.className = 'modal';
					d.querySelector('body').appendChild(modalGraciasTarjeta);
					
					let boxMsj = d.createElement('div');
					boxMsj.className = 'box-msj';
					modalGraciasTarjeta.appendChild(boxMsj);
						
					
					
					let gTarjeta = d.createElement('h2');
					gTarjeta.innerText = 'Gracias por tu Compra';
					boxMsj.appendChild(gTarjeta);
	
					let gTarjetaP = d.createElement('p');
					boxMsj.appendChild(gTarjetaP);
					gTarjetaP.innerText = 'Tu pedido esta en camino, Te Llegara un mail para que le hagas seguimiento';

					let closeBtnGT = d.createElement('a');
					closeBtnGT.innerText = 'X';
					closeBtnGT.href = "#";
					closeBtnGT.addEventListener('click', cerrarModalGracias);
					modalGraciasTarjeta.appendChild(closeBtnGT);
			
			};


				
					
			

				tbTitle.addEventListener('click', (e) => {
					
					if (tarjetaBox.classList.contains('active')){
						tarjetaBox.classList.remove('active');
					} else {
					tarjetaBox.className= 'active';
					if (transfeBox.classList.contains('active')){
						transfeBox.classList.remove('active');
					}
					}
				});
				
	
	
	
			};
	});
	

	

	

}
		




	);

const cerrarModal = (e) => {

    document.querySelector('.modal').remove();

}

const cerrarModalGracias = (e) => {
	localStorage.clear();
	location.reload();
    document.querySelector('.modal').remove();

}









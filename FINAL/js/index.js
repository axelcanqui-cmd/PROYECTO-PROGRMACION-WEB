var filtro = document.getElementById('filtro-categoria');
            
            filtro.onchange = function() {
                var categoria = filtro.value;
                var productos = document.querySelectorAll('.tarjeta-producto');
                
                for (var i = 0; i < productos.length; i++) {
                    var texto = productos[i].querySelector('p').textContent;
                    
                    if (categoria === 'Todos') {
                        productos[i].style.display = 'block';
                    } else if (texto.includes(categoria)) {
                        productos[i].style.display = 'block';
                    } else {
                        productos[i].style.display = 'none';
                    }
                }
            };
            
  
            var enlaces = document.querySelectorAll('.menu-movil a');
            var checkbox = document.getElementById('menu-toggle');
            
            for (var i = 0; i < enlaces.length; i++) {
                enlaces[i].onclick = function() {
                    checkbox.checked = false;
                };
            }

            var botonesAgregar = document.querySelectorAll('.boton-agregar');
            
            for (var i = 0; i < botonesAgregar.length; i++) {
                botonesAgregar[i].onclick = function() {
                    var tarjeta = this.parentElement;
                    var nombre = tarjeta.getAttribute('data-nombre');
                    var precio = tarjeta.getAttribute('data-precio');
                    var categoria = tarjeta.getAttribute('data-categoria');
                    var imagen = tarjeta.getAttribute('data-imagen');
                    
                    var producto = {
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria,
                        imagen: imagen
                    };
                    
                    agregarAlCarrito(producto);
    
                    this.textContent = 'Agregado';
                    this.style.background = '#1bc144ff';
                    
                    var boton = this;
                    setTimeout(function() {
                        boton.textContent = 'Agregar al carrito';
                        boton.style.background = '#27ae60';
                    }, 1500);
                };
            }
            

            function agregarAlCarrito(producto) {
                var carrito = obtenerCarrito();
                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContador();
            }
            
            function obtenerCarrito() {
                var carrito = localStorage.getItem('carrito');
                if (carrito) {
                    return JSON.parse(carrito);
                } else {
                    return [];
                }
            }
            
            function actualizarContador() {
                var carrito = obtenerCarrito();
                var contador = document.getElementById('contador');
                contador.textContent = carrito.length;
            }
            
            actualizarContador();
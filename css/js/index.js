 function filtrarProductos(categoria) {
            var productos = document.querySelectorAll('.tarjeta-producto');
            var select = document.getElementById('filtro-categoria');
            
            // Actualizar el select
            select.value = categoria;
            
            for (var i = 0; i < productos.length; i++) {
                var productoCategoria = productos[i].getAttribute('data-categoria');
                
                if (categoria === 'Todos') {
                    productos[i].style.display = 'block';
                } else if (productoCategoria === categoria) {
                    productos[i].style.display = 'block';
                } else {
                    productos[i].style.display = 'none';
                }
            }
        }

        // Enlaces del menú principal
        var enlacesMenu = document.querySelectorAll('.menu-principal a[data-filtro]');
        for (var i = 0; i < enlacesMenu.length; i++) {
            enlacesMenu[i].onclick = function(e) {
                var categoria = this.getAttribute('data-filtro');
                setTimeout(function() {
                    filtrarProductos(categoria);
                }, 100);
            };
        }

        // Enlaces del menú móvil
        var enlacesMovil = document.querySelectorAll('.menu-movil a[data-filtro]');
        for (var i = 0; i < enlacesMovil.length; i++) {
            enlacesMovil[i].onclick = function(e) {
                var categoria = this.getAttribute('data-filtro');
                var checkbox = document.getElementById('menu-toggle');
                checkbox.checked = false;
                setTimeout(function() {
                    filtrarProductos(categoria);
                }, 100);
            };
        }

        // Select de filtros
        var filtro = document.getElementById('filtro-categoria');
        filtro.onchange = function() {
            filtrarProductos(this.value);
        };

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
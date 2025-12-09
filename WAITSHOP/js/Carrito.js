 window.onload = function() {
            // Menú móvil
            var enlaces = document.querySelectorAll('.menu-movil a');
            var checkbox = document.getElementById('menu-toggle');
            
            for (var i = 0; i < enlaces.length; i++) {
                enlaces[i].onclick = function() {
                    checkbox.checked = false;
                };
            }
            
            // Cargar carrito
            cargarCarrito();
            
            // Carrusel de productos sugeridos
            var carrusel = document.getElementById('carrusel');
            var flechaIzq = document.getElementById('flecha-izq');
            var flechaDer = document.getElementById('flecha-der');
            
            flechaDer.onclick = function() {
                carrusel.scrollLeft += 240;
            };
            
            flechaIzq.onclick = function() {
                carrusel.scrollLeft -= 240;
            };
            
            // Botones de productos sugeridos
            var botonesSugeridos = document.querySelectorAll('.boton-agregar-sugerido');
            
            for (var i = 0; i < botonesSugeridos.length; i++) {
                botonesSugeridos[i].onclick = function() {
                    var item = this.parentElement;
                    var nombre = item.getAttribute('data-nombre');
                    var precio = item.getAttribute('data-precio');
                    var categoria = item.getAttribute('data-categoria');
                    var imagen = item.getAttribute('data-imagen');
                    
                    var producto = {
                        nombre: nombre,
                        precio: precio,
                        categoria: categoria,
                        imagen: imagen
                    };
                    
                    agregarAlCarrito(producto);
                    cargarCarrito();
                    
                    this.textContent = '✓';
                    this.style.background = '#1abc9c';
                    
                    var boton = this;
                    setTimeout(function() {
                        boton.textContent = '+';
                        boton.style.background = '#27ae60';
                    }, 1000);
                };
            }
            
            function cargarCarrito() {
                var carrito = obtenerCarrito();
                var lista = document.getElementById('lista-carrito');
                
                if (carrito.length === 0) {
                    lista.innerHTML = '<p style="text-align:center; padding:40px; color:#999;">Tu carrito está vacío</p>';
                    document.getElementById('subtotal').textContent = '0 BOB';
                    document.getElementById('total').textContent = '0 BOB';
                    return;
                }
                
                lista.innerHTML = '';
                var total = 0;
                
                for (var i = 0; i < carrito.length; i++) {
                    var producto = carrito[i];
                    total = total + parseInt(producto.precio);
                    
                    var articulo = document.createElement('article');
                    articulo.className = 'producto-carrito';
                    articulo.setAttribute('data-indice', i);
                    
                    articulo.innerHTML = 
                        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" class="foto-producto">' +
                        '<div class="detalle-producto">' +
                            '<h3>' + producto.nombre + '</h3>' +
                            '<p class="texto-info">' + producto.categoria + '<br>1 unidad</p>' +
                        '</div>' +
                        '<div class="precio-producto">' + producto.precio + ' BOB</div>' +
                        '<button class="boton-borrar">Eliminar</button>';
                    
                    lista.appendChild(articulo);
                }
                
                document.getElementById('subtotal').textContent = total + ' BOB';
                document.getElementById('total').textContent = total + ' BOB';
                
                var botonesEliminar = document.querySelectorAll('.boton-borrar');
                for (var i = 0; i < botonesEliminar.length; i++) {
                    botonesEliminar[i].onclick = function() {
                        var articulo = this.parentElement;
                        var indice = articulo.getAttribute('data-indice');
                        
                        articulo.style.opacity = '0';
                        articulo.style.transform = 'translateX(-50px)';
                        
                        setTimeout(function() {
                            eliminarDelCarrito(indice);
                            cargarCarrito();
                        }, 300);
                    };
                }
            }
            
            function obtenerCarrito() {
                var carrito = localStorage.getItem('carrito');
                if (carrito) {
                    return JSON.parse(carrito);
                } else {
                    return [];
                }
            }
            
            function agregarAlCarrito(producto) {
                var carrito = obtenerCarrito();
                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
            
            function eliminarDelCarrito(indice) {
                var carrito = obtenerCarrito();
                carrito.splice(indice, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
        };
window.onload = function() {
            mostrarResumen();

            var form = document.getElementById('formulario-compra');
            form.onsubmit = function(e) {
                e.preventDefault();
                
                var carrito = obtenerCarrito();
                if (carrito.length === 0) {
                    alert('Tu carrito está vacío');
                    return;
                }
                
                alert('¡Compra realizada con éxito! Gracias por tu compra.');
                localStorage.removeItem('carrito');
                window.location.href = 'index.html';
            };
        };

        function mostrarResumen() {
            var carrito = obtenerCarrito();
            var lista = document.getElementById('lista-productos');
            
            if (carrito.length === 0) {
                lista.innerHTML = '<div class="vacio">Tu carrito está vacío</div>';
                document.getElementById('subtotal').textContent = '0 BOB';
                document.getElementById('total').textContent = '0 BOB';
                return;
            }
            
            lista.innerHTML = '';
            var total = 0;
            
            for (var i = 0; i < carrito.length; i++) {
                var p = carrito[i];
                total += parseInt(p.precio);
                
                var div = document.createElement('div');
                div.className = 'producto-item';
                div.innerHTML = 
                    '<img src="' + p.imagen + '" class="producto-img">' +
                    '<div class="producto-info">' +
                        '<h4>' + p.nombre + '</h4>' +
                        '<p>' + p.categoria + '</p>' +
                    '</div>' +
                    '<div class="producto-precio">' + p.precio + ' BOB</div>';
                
                lista.appendChild(div);
            }
            
            document.getElementById('subtotal').textContent = total + ' BOB';
            document.getElementById('total').textContent = total + ' BOB';
        }

        function obtenerCarrito() {
            var carrito = localStorage.getItem('carrito');
            if (carrito) {
                return JSON.parse(carrito);
            }
            return [];
        }
        
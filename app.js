let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});


const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

        // La consulta es exitosa
        if (respuesta.status === 200) {
            console.log("Conexion Exitosa codigo de status: " + respuesta.status);
            console.log(respuesta);

            const datos = await respuesta.json();
            console.log(datos);

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                            <div class="pelicula">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                                <h3 class="titulo">${pelicula.title}</h3>
                            </div>
                        `;
            })

            document.getElementById('contenedor').innerHTML = peliculas;
        }



        // Se Configura Mensaje personalisado por consola Informando cual es el estatus del error
        if (respuesta.status === 401) {
            console.log("Error en la API Key (v3 auth) Number error is: " + respuesta.status);
        }
        // ERROR, La pelicula no existe
        if (respuesta.status === 404) {
            console.log(" La pelicula No Existe ");
        }

    } catch (error) {
        //console.log(respuesta);
    }
}

cargarPeliculas();
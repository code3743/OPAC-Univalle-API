# OPAC  Univalle API

### API no oficial del sistema OPAC de la Universidad del Valle

¡Bienvenido al proyecto educativo "API OPAC Univalle"!


Aquí podrás encontrar una increíble API que te permite realizar consultas al sistema desde tu dispositivo móvil. ¿Por qué? Porque sabemos que no siempre es fácil acceder al catálogo desde tu teléfono. ¡Pero no te preocupes, estamos aquí para ayudarte!


Queremos destacar que la velocidad de respuesta puede depender de la velocidad del sistema web OPAC. Utilizamos métodos de Web Scraping para obtener la información necesaria y brindarte una experiencia única.


Recuerda que este proyecto tiene fines educativos, ¡así que diviértete explorando y aprendiendo! Si tienes alguna pregunta, no dudes en contactarnos.


¡Disfruta del viaje!

#### Funciones

- obtener informacion del usuario (Historial de prestamos, Prestamos activos, Multa e informacion personal)
- renovar libros, se puede renovar un libro o todos.
- buscar libros, permite obtener los 10 primeros resultados de coincidencia
- ver detalles del ejemplar (Ubicación, disponibilidad, numero de ejemplares)
- generar citas en formato APA 7
- buscar en las bases de datos de la Universidad deL Valle
- listar todas las bases de datos de la Universidad
 

### endpoints principales

1. ` {dominio}/api/login?codigo=CODIGO_ESTUDIANTE`
obtener la informacion principal del OPAC

**parametros:**
- codigo: Codigo del estudiante tal cual como inicia sesión en el OPAC Web

**Respuesta:**

```sh
{
    nombre: string,
    apellido: string,
    fechaExpiracion :string,
    multa: string,
    librosPrestados: [
        {
        index: number,
        codigo: string,
        titulo: string,
        fecha: string,
        multa: string
        }
        ...
    ],
    historialPrestamos: [
        {
        codigo: string,
        titulo: string,
        fecha: string
        }
        ...
    ]
}
```

2. ` {dominio}/api/renovar/INDEX_LIBRO/?codigo=CODIGO_ESTUDIANTE`
Renovar libro por index, el index debe ser el mismo que retonar cada uno de los libros en prestamos

**parametros:**
- codigo: Codigo del estudiante tal cual como inicia sesión en el OPAC Web
- INDEX_LIBRO: nuemro del libro que se desea renovar

**Respuesta:**    
```sh
{
    total: number,
    estado:  [
        {
        titulo: string,
        fecha: string
        }
    ],
}
```


3. ` {dominio}/api/renovar/?codigo=CODIGO_ESTUDIANTE`
Renovar todo los libros en prestamo
**parametros:**
- codigo: Codigo del estudiante tal cual como inicia sesión en el OPAC Web

**Respuesta:**    
```sh
{
    total: number,
    estado:  [
        {
        titulo: string,
        fecha: string
        }
        ...
    ],
}
```

4. ` {dominio}/api/buscar?q=NOMBRE_EJEMPLAR`
Retorna un listado de maximo 10 resultados

**parametros:**
- q: El nombre del libro que se desee buscar

**Respuesta:**    
```sh
{
    tituloBuscado: string,
    totalResultados : number,
    resultadosBusqueda : [
        {
            id: string,
            nombre: string,
            autor: string,
            ISBN: string | null,
            detalle: string,
            ejemplares: string,
            imagenUrl: string | null
        }
        ...
    ]
}
```

5. ` {dominio}/api/detalle/isbn/ISBN_LIBRO`
Retorna informacion detallada de un ejemplar por medio del ID obtenido en resultadosBusqueda

**parametros:**
- ISBN_LIBRO: isbn retornado en la busqueda

**Respuesta:**    
```sh
{
    imagen: string | null,
    resumen: string,
    disponibilidad: [{
        codigo: string
        localizacion: string
        estante: string
        signatura: string
        coleccion: string
        estado: string
        categoria: string
    }
    ...
    ]
}
```

6. ` {dominio}/api/detalle/oid/OID`
Retorna informacion detallada de un ejemplar por medio del ID obtenido en resultadosBusqueda

**parametros:**
- OID: isbn retornado en la busqueda

**Respuesta:**    
```sh
{
    imagen: string | null,
    resumen: string,
    disponibilidad: [{
        codigo: string
        localizacion: string
        estante: string
        signatura: string
        coleccion: string
        estado: string
        categoria: string
    }
    ...
    ]
}
```

7. ` {dominio}/api/cita?isbn=ISBN`
Retorna la cita del ejemplar en formato APA 7 Ed.

**parametros:**
- ISBN: identificador unico del ejemplar (10 o 13)

**Respuesta:**    
```sh
{
  autores: string,
  anioPublicacion: string,
  tituloLibro: string,
  subtitulo: string,
  numeroEdicion: string,
  editorial: string,
  citaAPA: string
}
```

¡A explorar y disfrutar de nuestra API OPAC Univalle! Si tienes alguna pregunta, no dudes en contactarnos. Estamos aquí para hacer de tu experiencia bibliotecaria algo grandioso. 
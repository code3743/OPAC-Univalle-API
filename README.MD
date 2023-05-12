# OPAC  Univalle API

### API no oficial del sistema OPAC de la Universidad del Valle

Este proyecto solo con fines educativos, la API se construyo para poder realizar consultas
al sistema desde el dispositivo movil, ya que actualmente no es posible iniciar sesión al catalogo
desde un movil,cabe resaltar que la velocidad de respuesta esta
fuertemente ligada a la velocidad de respuesta del sistema web OPAC, ya que se utilizan
metodos de Web Scrapping para poder obtener la información.

#### Funciones

- obtener informacion del usuario (Historial de prestamos, Prestamos activos, Multa e informacion personal)
- renovar libros, se puede renovar un libro o todos.
- buscar libros, permite obtener los 10 primeros resultados de coincidencia
- ver detalles del ejemplar (Ubicación, disponibilidad, numero de ejemplares)
 

### endpoints
1. ` {dominio}/api?codigo=CODIGO_ESTUDIANTE`
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
    imagen: string || null,
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
    imagen: string || null,
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
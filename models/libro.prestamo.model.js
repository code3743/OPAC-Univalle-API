class LibroEnPrestamo{
    #index;
    #codigo;
    #titulo;
    #fecha;
    #multa;
    constructor(index, codigo, titulo, fecha, multa){
        this.#index = index
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#fecha = fecha;
        this.#multa = multa;
    }

    toJson(){
        if(this.#index !== undefined || this.#index !== null){
            return {
                'index' : this.#index,
                'codigo' : this.#codigo,
                'titulo': this.#titulo,
                'fecha' : this.#fecha,
                'multa': this.#multa 
            }
        }
        return {
            'codigo' : this.#codigo,
            'titulo': this.#titulo,
            'fecha' : this.#fecha,
        }
        
    }
}

module.exports = LibroEnPrestamo;
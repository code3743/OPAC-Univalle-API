const axios = require('axios');
const logger = require('../utils/logger');
const constantes = require('../config/constantes');

/**
 * @param {string} nombrePublicacion 
 */
const buscarDBUnivalle = async (nombrePublicacion) => {

    const url = constantes.URL_BUSCADOR;
    const params = {
      search: nombrePublicacion,
      offset: 1,
      count: 20,
      orderBy: 'relevance',
      searchField: 'titlename',
      includeFacets: true,
      searchtype: 'contains',
      alphamenufacet: '',
      subjectFacetSchemaFilter: 'library of congress',
      resourceTypeOptionSelected: '',
      custId: 's6493750',
      groupId: 'main',
      profileId: 'pfui',
      sessionId: '-12080940'
    };
  
    try {
      const response = await axios.get(url, { params });
      const data = response.data.searchResult.pfData.records;
    const datosPorcesados = [];

    data.forEach(resultado => {
        const titulo = resultado.titleName;
        const editorial = resultado.publisherName;
        const identificadores = [];
        resultado.identifiersList.forEach(identificador => {
            identificadores.push({
                id : identificador.id,
                nombre : identificador.source
            });
        });
        const contribuidores = [];
        resultado.contributorsList.forEach(contribuidor => {
            contribuidores.push({
                tipo: contribuidor.type,
                nombre: contribuidor.contributor
            });
        });

        const ubicaciones = [];
        resultado.customerResourcesList.forEach(ubicacion =>{
            ubicaciones.push({
                proveedor : ubicacion.packageName,
                urlPublicacion : ubicacion.linkOutTargetUrl
            });
        });

        datosPorcesados.push({
            titulo,
            editorial,
            identificadores,
            contribuidores,
            ubicaciones
        });
    });
      return datosPorcesados;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }


module.exports = buscarDBUnivalle;
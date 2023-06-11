window.addEventListener('DOMContentLoaded', () => {
    fetch('/logs')
      .then(response => response.text())
      .then(logs => {
        const logContent = document.getElementById('log-content');
        logContent.textContent = logs;
      })
      .catch(error => {
        console.error('Error al cargar los registros de log:', error);
      });
  });
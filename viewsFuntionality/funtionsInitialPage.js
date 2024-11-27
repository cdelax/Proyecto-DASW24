// Definir categorías y proyectos de ejemplo
const categorias = [
    { value: 'categoria1', text: 'Categoría 1' },
    { value: 'categoria2', text: 'Categoría 2' },
    { value: 'categoria3', text: 'Categoría 3' },
    { value: 'categoria4', text: 'Categoría 4' },
    { value: 'categoria5', text: 'Categoría 5' },
    { value: 'categoria6', text: 'Categoría 6' }
];

const proyectos = [
    { titulo: 'Proyecto 1', descripcion: 'Descripción del Proyecto 1', categoria: 'categoria1' },
    { titulo: 'Proyecto 2', descripcion: 'Descripción del Proyecto 2', categoria: 'categoria2' },
    { titulo: 'Proyecto 3', descripcion: 'Descripción del Proyecto 3', categoria: 'categoria3' },
    { titulo: 'Proyecto 4', descripcion: 'Descripción del Proyecto 4', categoria: 'categoria1' },
    { titulo: 'Proyecto 5', descripcion: 'Descripción del Proyecto 5', categoria: 'categoria2' },
    { titulo: 'Proyecto 6', descripcion: 'Descripción del Proyecto 6', categoria: 'categoria5' },
    { titulo: 'Proyecto 7', descripcion: 'Descripción del Proyecto 7', categoria: 'categoria6' },
    // Añadir más proyectos según sea necesario
];
let observer;

// Agregar categorías al select
function addCategories() {
    const selectCategorias = document.getElementById('categoryFilter');
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.value;
        option.textContent = categoria.text;
        selectCategorias.appendChild(option);
    });
}

// Inicializar Select2 para el filtro de categorías
function selectCategoriesOptions() {
    $('#categoryFilter').select2({
        placeholder: "Selecciona categorías",
        allowClear: true
    });
}

// Mostrar todos los proyectos filtrados de una vez
function mostrarProyectos(filtrados) {
    const projectContainer = document.getElementById('projectContainer');
    projectContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los proyectos

    filtrados.forEach(proyecto => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <h5>${proyecto.titulo}</h5>
            <p>${proyecto.descripcion}</p>
        `;
        projectContainer.appendChild(projectCard);

        observer.observe(projectCard); // Observar cada card creada
    });
}

// Configurar IntersectionObserver para aplicar la clase "show" a los elementos visibles
const container = document.getElementById('projectContainer');
observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
}, {
    root: container,    // Observa en relación con el contenedor con scroll
    rootMargin: "0px",
    threshold: 1     // Se activa cuando el 100% del elemento es visible en el contenedor
});

// Filtrar proyectos según la búsqueda
function filtrarProyectos(event) {
    event.preventDefault();
    const query = document.getElementById('projectSearch').value.toLowerCase();
    const selectedCategories = $('#categoryFilter').val();

    const resultados = proyectos.filter(proyecto => {
        const cumpleTitulo = proyecto.titulo.toLowerCase().includes(query);
        const cumpleCategoria = selectedCategories.length === 0 || selectedCategories.includes(proyecto.categoria);
        return cumpleTitulo && cumpleCategoria;
    });

    mostrarProyectos(resultados); // Mostrar todos los proyectos filtrados
}

// Inicialización de la página
document.addEventListener('DOMContentLoaded', () => {
    addCategories();
    selectCategoriesOptions();
    mostrarProyectos(proyectos); // Mostrar todos los proyectos al cargar la página
    document.getElementById('searchForm').addEventListener('submit', filtrarProyectos);
});

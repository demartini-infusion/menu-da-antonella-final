document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-pill');
    const modal = document.getElementById('recipeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    // DATA LOADED FROM data/recipes.js
    const allRecipes = window.recipesData || [];

    let currentCategory = 'all';

    // 1. Initial Render
    renderRecipes(allRecipes);

    // 2. Render Recipes
    function renderRecipes(recipes) {
        recipeContainer.innerHTML = '';

        if (recipes.length === 0) {
            recipeContainer.innerHTML = '<div class="loading-state"><p>Nenhuma receita encontrada para essa busca. 🥕</p></div>';
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <div class="recipe-card-header">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <span class="recipe-category">${recipe.category}</span>
                </div>
                <div class="recipe-meta">
                    <span>👶 ${recipe.age_months}m+</span>
                    <span>⏱️ ${recipe.prep_time}</span>
                </div>
                <button class="view-btn">Ver Receita</button>
            `;

            card.addEventListener('click', () => openRecipe(recipe));
            recipeContainer.appendChild(card);
        });
    }

    // 3. Search Functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterRecipes(searchTerm, currentCategory);
    });

    // 4. Filter Functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            currentCategory = btn.dataset.category;
            const searchTerm = searchInput.value.toLowerCase();
            filterRecipes(searchTerm, currentCategory);
        });
    });

    function filterRecipes(term, category) {
        const filtered = allRecipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(term) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(term));

            const matchesCategory = category === 'all' || recipe.category.includes(category);

            return matchesSearch && matchesCategory;
        });
        renderRecipes(filtered);
    }

    // 5. Modal Logic
    function openRecipe(recipe) {
        modalBody.innerHTML = `
            <h2 class="detail-title">${recipe.title}</h2>
            
            <div class="recipe-meta" style="font-size: 16px; margin-bottom: 20px;">
                <span>👶 Indicado: <strong>${recipe.age_months} meses+</strong></span>
                <span>⏱️ Preparo: <strong>${recipe.prep_time}</strong></span>
            </div>

            <h3 class="detail-section-title">🛒 Ingredientes</h3>
            <ul class="detail-list">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>

            <h3 class="detail-section-title">👩‍🍳 Como Fazer</h3>
            <div class="detail-steps">
                <ol>
                    ${recipe.method.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            ${recipe.tips ? `
                <div class="detail-tip">
                    <strong>💡 Dica BLW:</strong> ${recipe.tips}
                </div>
            ` : ''}
        `;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

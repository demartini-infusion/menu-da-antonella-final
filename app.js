document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-pill');
    const modal = document.getElementById('recipeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    // DATA EMBEDED DIRECTLY TO AVOID CORS ERRORS WHEN OPENING LOCALLY
    const allRecipes = [
        {
            "id": 1,
            "title": "Panqueca de Banana e Aveia",
            "category": "Café da Manhã/Lanche",
            "age_months": 6,
            "ingredients": [
                "1 banana madura",
                "1 ovo",
                "2 colheres (sopa) de farelo de aveia",
                "Canela em pó a gosto (opcional)"
            ],
            "method": [
                "Amasse bem a banana com um garfo.",
                "Misture o ovo batido e a aveia até formar uma massa homogênea.",
                "Aqueça uma frigideira antiaderente levemente untada com azeite ou óleo de coco.",
                "Despeje pequenas porções da massa para formar mini panquecas.",
                "Doure dos dois lados e sirva."
            ],
            "tips": "Ótima para congelar! Faça várias e guarde no freezer para lanches rápidos.",
            "prep_time": "10 min"
        },
        {
            "id": 2,
            "title": "Muffin de Legumes Coloridos",
            "category": "Lanche/Jantar",
            "age_months": 9,
            "ingredients": [
                "2 ovos",
                "1/2 xícara de abobrinha ralada",
                "1/2 xícara de cenoura ralada",
                "2 colheres (sopa) de farinha de trigo integral ou aveia",
                "1 colher (café) de fermento",
                "Orégano e cheiro-verde a gosto"
            ],
            "method": [
                "Bata os ovos com um garfo.",
                "Misture os legumes ralados, a farinha e os temperos.",
                "Por último, adicione o fermento delicadamente.",
                "Coloque em forminhas de silicone (tamanho cupcake mini).",
                "Asse em forno pré-aquecido a 180°C por cerca de 20 minutos ou até dourar."
            ],
            "tips": "Fácil para a mãozinha do bebê segurar. Pode variar os legumes (brócolis, milho).",
            "prep_time": "25 min"
        },
        {
            "id": 3,
            "title": "Hambúrguer de Grão de Bico e Cenoura",
            "category": "Almoço/Jantar",
            "age_months": 9,
            "ingredients": [
                "1 xícara de grão de bico cozido (bem macio)",
                "1/2 cenoura ralada fina",
                "1 colher (sopa) de azeite",
                "Farinha de aveia para dar liga (se precisar)",
                "Salsinha e cebolinha picadas"
            ],
            "method": [
                "Amasse o grão de bico grosseiramente, deixando alguns pedacinhos para textura.",
                "Misture a cenoura, o azeite e os temperos.",
                "Se estiver muito úmido, adicione aveia aos poucos até conseguir moldar.",
                "Modele pequenos hambúrgueres.",
                "Grelhe em frigideira untada ou asse até dourar levemente."
            ],
            "tips": "Rico em ferro e proteína vegetal. Acompanha bem arroz e brócolis.",
            "prep_time": "20 min"
        },
        {
            "id": 4,
            "title": "Bolinho de Carne Nutritivo",
            "category": "Almoço/Jantar",
            "age_months": 9,
            "ingredients": [
                "200g de carne moída (patinho ou músculo)",
                "1/2 abobrinha ralada (sem o excesso de água)",
                "1/2 cebola pequena ralada",
                "1 colher (sopa) de aveia em flocos finos",
                "Alho e ervas a gosto"
            ],
            "method": [
                "Misture todos os ingredientes em uma tigela até ficar homogêneo.",
                "Modele bolinhas ou croquetes pequenos (formato fácil de pegar).",
                "Asse em assadeira untada por 20-25 minutos a 180°C, virando na metade do tempo.",
                "Verifique se está bem cozido por dentro antes de oferecer."
            ],
            "tips": "Esconda vegetais na carne para bebês seletivos!",
            "prep_time": "30 min"
        },
        {
            "id": 5,
            "title": "Mingau de Aveia com Maçã e Canela",
            "category": "Café da Manhã/Lanche",
            "age_months": 6,
            "ingredients": [
                "2 colheres (sopa) de aveia em flocos",
                "200ml de água ou leite materno/fórmula (se usar leite de vaca, consulte pediatra)",
                "1 maçã pequena ralada ou em cubinhos bem pequenos cozidos",
                "Uma pitada de canela"
            ],
            "method": [
                "Em uma panela, cozinhe a aveia com a água/leite até engrossar.",
                "Adicione a maçã e cozinhe junto para amaciar.",
                "Finalize com canela.",
                "Espere esfriar bem antes de servir."
            ],
            "tips": "Conforto em forma de comida para dias frios.",
            "prep_time": "10 min"
        },
        {
            "id": 6,
            "title": "Hummus Suave (Pasta de Grão de Bico)",
            "category": "Lanche",
            "age_months": 9,
            "ingredients": [
                "1 xícara de grão de bico cozido (sem pele, se possível, para menos gases)",
                "1 colher (sopa) de azeite de oliva",
                "Suco de 1/2 limão (pouco, para não ficar ácido demais)",
                "1 pitada de cominho (opcional)",
                "Água do cozimento para dar ponto"
            ],
            "method": [
                "Processe o grão de bico com azeite, limão e cominho.",
                "Adicione água aos poucos até obter uma pasta cremosa e lisa.",
                "Sirva com palitos de cenoura cozida ou pepino (cortes seguros longitudinais)."
            ],
            "tips": "Excelente fonte de energia e proteína. Ótimo para 'dipear'.",
            "prep_time": "10 min"
        },
        {
            "id": 7,
            "title": "Omelete de Forno com Espinafre",
            "category": "Almoço/Jantar",
            "age_months": 9,
            "ingredients": [
                "2 ovos",
                "1 mão de espinafre picadinho (refogado rapido para murchar)",
                "1 colher (sopa) de queijo cottage ou ricota amassada",
                "Tomatinhos cereja picados (opcional)"
            ],
            "method": [
                "Bata os ovos ligeiramente.",
                "Misture o espinafre e o queijo.",
                "Despeje em forminhas untadas.",
                "Asse por 15 min até firmar."
            ],
            "tips": "Textura macia e fácil de engolir. O espinafre é rico em ferro.",
            "prep_time": "20 min"
        }
    ];

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

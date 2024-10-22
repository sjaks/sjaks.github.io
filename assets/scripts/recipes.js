const urlParams = new URLSearchParams(window.location.search);
const recipe = urlParams.get('r');
const language = urlParams.get('lang');

if (recipe) {
    loadContent("cookbook", recipe, language);
}

function openRecipe(url) {
    const data = fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('recipe-view').innerHTML = `
                            <h3>${data.name}</h3>
                            <p>Ainesosat:</p>
                            <ul>
                                ${data.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                            <p>Ohjeet:</p>
                            <ol>
                                ${data.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        `;
            document.getElementById('recipe-container').setAttribute('style', 'display: block;');
        });
}

function getRecipes(recipe, language) {
    fetch('https://sjaks.iki.fi/cookbook/index.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cookbook-content').innerHTML =
                document.getElementById('cookbook-content').innerHTML +
                data.recipes.map(recipe => {
                    return `
                                    <tr>
                                        <td>
                                            <a href="?r=${recipe.name}">${recipe.name}</a>
                                            (<a href="?r=${recipe.name}&lang=en">en</a>)
                                        </td>
                                        <td>${recipe.allergies.join(", ")}</td>
                                        <td>${recipe.star ? "&#x2713;" : ""}</td>
                                    </tr>
                                `;
                }).join('');

            if (recipe) {
                const url = language == "en" ? data.recipes.find(r => r.name === recipe).urlLoc
                    : data.recipes.find(r => r.name === recipe).url;
                openRecipe(url);
            }
        });
}

function clearParam() {
    const url = new URL(window.location);
    url.searchParams.delete('r');
    url.searchParams.delete('lang');
    window.history.replaceState({}, '', url);
}

function closeRecipe() {
    document.getElementById('recipe-container').setAttribute('style', 'display: none;');
    clearParam();
}

function loadContent(page, recipe, language) {
    const template = document.getElementById(`${page}-template`);

    if (template) {
        const content = document.importNode(template.content, true);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';
        mainContent.appendChild(content);

        const elements = document.querySelectorAll('.active');

        elements.forEach(function (element) {
            element.classList.remove('active');
        });

        const activeTab = document.getElementById(page);
        activeTab.parentElement.classList.add("active");

        if (page === 'cookbook') {
            getRecipes(recipe, language);
        } else {
            clearParam();
        }
    }
}

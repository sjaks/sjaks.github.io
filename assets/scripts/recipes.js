const RECIPE_API_INDEX = 'https://sjaks.iki.fi/cookbook/index.json';

function initialize() {
    const urlPath = window.location.hash;

    if (urlPath && urlPath.length > 0) {
        const path = urlPath.substring(1);
        loadContent(path);

        if (path.startsWith('cookbook-')) {
            const parts = path.split('-');
            const page = parts[0];
            const language = parts[1];
            const recipe = parts.slice(2).join('-');
            console.log(language)
            loadContent(page, recipe, language);
        }
    }
}

function openRecipe(url, languagePrefix) {
    fetch(url)
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
            setHash('cookbook-' + languagePrefix + "-" + formatForUrl(data.name));
        });
}

function getRecipes(recipe, language) {
    fetch(RECIPE_API_INDEX)
        .then(response => response.json())
        .then(data => {
            document.getElementById('cookbook-content').innerHTML =
                document.getElementById('cookbook-content').innerHTML +
                data.recipes.map(recipe => {
                    return `
                            <tr>
                                <td class="finnish" ${language !== "fi" && 'style= "display: none"'}>
                                    <a onclick="openRecipe('${recipe.url}', 'fi')">${recipe.name}</a>
                                </td>
                                <td class="english" ${language === "fi" && 'style= "display: none"'}>
                                    <a onclick="openRecipe('${recipe.urlLoc}', 'en')">${recipe.nameLoc}</a>
                                </td>
                                <td>${recipe.allergies.join(", ")}</td>
                                <td>${recipe.star ? "&#x2713;" : ""}</td>
                            </tr>
                            `;
                }).join('');

            if (recipe) {
                const url = language == "en" ? data.recipes.find(r => formatForUrl(r.nameLoc) === recipe).urlLoc
                    : data.recipes.find(r => formatForUrl(r.name) === recipe).url;
                openRecipe(url, language);
            }
        });
}

function closeRecipe() {
    document.getElementById('recipe-container').setAttribute('style', 'display: none;');
    setHash('cookbook')
}

function loadContent(page, recipe, language) {
    setHash(page);
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
        }
    }
}

function showFinnish() {
    document.querySelectorAll('.finnish').forEach(function (element) {
        element.style.display = 'table-cell';
    });
    document.querySelectorAll('.english').forEach(function (element) {
        element.style.display = 'none';
    });
}

function showEnglish() {
    document.querySelectorAll('.finnish').forEach(function (element) {
        element.style.display = 'none';
    });
    document.querySelectorAll('.english').forEach(function (element) {
        element.style.display = 'table-cell';
    });
}

function setHash(page) {
    if (page === 'home') {
        history.replaceState(null, null, ' ');
        return;
    }
    window.location.hash = "#" + page;
}

function formatForUrl(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

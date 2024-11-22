const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

const kitchenTips = [
	"Always read the entire recipe before you start cooking!",
	"Room temperature eggs blend more easily in batters.",
	"Add a pinch of salt to make coffee less bitter.",
	"Prevent pasta from sticking by adding olive oil to the cooking water.",
	"Sharp knives are safer than dull ones.",
	"Rest meat after cooking to keep the juices inside.",
	"Measure ingredients before you start cooking.",
	"Clean as you go to maintain an organized kitchen.",
	"Toast spices to enhance their flavor.",
	"Keep your knife sharp for better control and safety."
];

const foodEmojis = ['🍔', '🍕', '🌮', '🍜', '🍖', '🍗', '🥘', '🥗', '🍝', '🍱'];

const updateFoodFact = () => {
	const foodFactElement = document.getElementById('food-fact');
	foodFactElement.classList.remove('show');
	
	setTimeout(() => {
		const randomTip = kitchenTips[Math.floor(Math.random() * kitchenTips.length)];
		foodFactElement.textContent = randomTip;
		foodFactElement.classList.add('show');
	}, 300);
};

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createMeal(res.meals[0]);
	}).catch(e => {
		console.warn(e);
	})
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="meal-header">
			<h4>${meal.strMeal}</h4>
		</div>
		<div class="meal-content">
			<div class="meal-image-container">
				<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
				<div class="meal-meta">
					${meal.strCategory ? `<span class="meta-item"><i class="fas fa-tag"></i> ${meal.strCategory}</span>` : ''}
					${meal.strArea ? `<span class="meta-item"><i class="fas fa-globe-americas"></i> ${meal.strArea}</span>` : ''}
				</div>
				<div class="ingredients-list">
					<h5><i class="fas fa-list"></i> Ingredients</h5>
					<ul>
						${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
					</ul>
				</div>
			</div>
			<div class="meal-details">
				<div class="instructions">
					<h5><i class="fas fa-book-open"></i> Instructions</h5>
					<p>${meal.strInstructions}</p>
				</div>
				${meal.strYoutube ? `
				<div class="video-section">
					<h5><i class="fab fa-youtube"></i> Video Recipe</h5>
					<div class="videoWrapper">
						<iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
							title="Recipe Video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen>
						</iframe>
					</div>
				</div>` : ''}
			</div>
		</div>
	`;
	
	meal_container.innerHTML = newInnerHTML;
	meal_container.classList.add('show');
	
	const foodEmojiElement = document.querySelector('.food-emoji');
	if (foodEmojiElement) {
		foodEmojiElement.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
	}
	
	updateFoodFact();
}

updateFoodFact(); // Show initial tip on page load

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});
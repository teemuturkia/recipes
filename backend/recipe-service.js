const recipes = [
    {
        ingredients: [
            {
                amount: '1tl',
                description: 'sokeria'
            },
            {
                amount: '3dl',
                description: 'jauhoa'
            }
        ],
        procedure: 'Vatkaa ja sekoita.'
    }
];

function getAll() {
    return recipes;
}

function create(recipe) {
    recipes.push(recipe);
}

module.exports = {
    getAll,
    create
};

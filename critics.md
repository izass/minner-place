# Critics

I would refactor all the api request part, create a env file to get the base url and create services for each entity of the external api, as products, cart, categories and etc. In components such as `Cart.ts` to separate the state logic from the render part, creating custom hook to do that.

I'm not a big fan of tailwind but as this is a project decision, I would separate better the html part in small components where the layout could be more independent and focused in one thing per time. There's some places in the code where logic is computed inside the render, I would avoid  this by putting the logic inside variables or functions outside of the the return of the elements.

In some places of the code is being used fetch api and in others axios. I think this is a huge problem and I would refactor the code to use just one or another, preferably axios. There are some functions that are doing too much work, such as `clearCartˆ. I would refactor it to small functions, this way it would be cleaner and easy to test, which is actually another point of improvement, add tests to the components, functions and new and old hooks.

# Frontend Evaluation 2024-02 - MinerPlace - Recognition

**MinerPlace** is a **store** for home supplies, where customers can select amoung the available products and receive them in the comfort of their homes.

## Given Scenario

Currently, we have a single page (store front), where all the available products can be seen, organized by categories.

All products can be added to the cart through the products list, and for the time being, customers can only buy one unit of each product at a time.

Our cart is entirely handled in our BE, to make sure the displayed data is reliable, so we always need to be mindful when it comes to states and data validation.

When a Cart is created, its unique identifier will be locally stored, so we can tell which cart belongs to the current customer.

## Requirements

- Node v18.19.0 (advised)

## Important Dependencies

- [React](https://github.com/facebook/react/)
- [Vitest](https://github.com/vitest-dev/vitest)
- [Tailwind](https://tailwindcss.com/docs/installation)

## Setting up

- `npm install` - Install all dependencies

## Running

- `npm run dev` - runs the application locally

- `npm run test` - runs vitest

> [!WARNING]  
> !!! The application does not work properly without the BE counterpart. Keep in mind you have to run both, and thus, you need to set up the BE as well. !!!

## API

API documentation can be found in the BE counterpart provided to you.

**IMPORTANT: The API might fail due to network issues or other reasons, take that into consideration!**

## Critics to the original code

In addition to a Merge Request for each task, it's expected from you to write a document criticizing the original code provided, where you can mention things that you would change or refactor if it was a real client project. Use the setup and code exploration phase to pay attention to informations that you would add to this document.

The document should be provided in a file called critics.md in the Merge Request.

## Gitlab Instructions

- Create a new **private and empty** repository (leave "Initialize repository with a README" **unchecked**, like image below) in your own Gitlab account and give access to it to your reviewer:

![create the repo](https://user-images.githubusercontent.com/4325587/173120718-16547fae-b507-496d-939b-7cf9a7950640.jpg)

- Clone **your** repository locally
- Inside the folder, run: `git pull https://gitlab.com/codeminer-42/avaliacoes/minerplace-frontend main && git push origin main`.

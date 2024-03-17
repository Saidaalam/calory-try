import React from 'react';

const SingleRecipe = ({ recipe, handleCart }) => {
  const { recipe_id, recipe_name, short_description, ingredients, preparing_time, calories, recipe_image } = recipe;

  return (
    <div>
      <div className='card'>
        <img src={recipe_image} alt='' />
        <h1 className='font-bold text-xl mt-4'>{recipe_name}</h1>
        <p className='text-lg mt-2'>{short_description}</p>
        <h2 className='font-semibold text-xl'>Ingredients : {ingredients.length}</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <div className='cart-footer'>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock mt-1" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
            </svg>
            {preparing_time}
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire mt-1" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
            </svg>
            {calories}
          </p>
        </div>
        <button onClick={(e) => handleCart(recipe)} className='bg-green-600 w-1/3 p-3 text-white rounded-xl mt-4'>Want to cook</button>
      </div>
    </div>
  );
};

export default SingleRecipe;

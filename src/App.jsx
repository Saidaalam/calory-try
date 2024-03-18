import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleRecipe from "./SingleRecipe";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentlyCooking, setCurrentlyCooking] = useState([]);

  useEffect(() => {
    fetch("./fakeData.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleCart = (recipe) => {
    const isExists = cart.find((item) => item.recipe_id === recipe.recipe_id);
    if (!isExists) {
      setCart([...cart, recipe]);
    } else {
      toast.error("Product already exists in the cart");
    }
  };

  const handlePreparing = (recipe) => {
    setCart(cart.filter((item) => item.recipe_id !== recipe.recipe_id));
    setCurrentlyCooking([...currentlyCooking, recipe]);
    toast.success("Recipe added to Currently Cooking");
  };

  const calculateTotalTime = (recipes) => {
    let totalTime = 0;
    recipes.forEach((recipe) => {
      totalTime += parseInt(recipe.preparing_time);
    });
    return totalTime;
  };

  const calculateTotalCalories = (recipes) => {
    let totalCalories = 0;
    recipes.forEach((recipe) => {
      totalCalories += parseInt(recipe.calories.split(" ")[0]);
    });
    return totalCalories;
  };

  return (
    <>
      <ToastContainer />
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl font-bold">Recipe Calories</a>
        </div>
        <div className="navbar-start flex">
          <ul className="menu menu-horizontal px-2 text-xl ml-12">
            <li><a>Home</a></li>
            <li><a>Recipe</a></li>
            <li><a>About</a></li>
            <li><a>Search</a></li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-green-400">
                <a><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle ml-2 mt-2" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero h-screen mt-3 container mx-auto rounded-3xl">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-4xl font-bold">Discover an exceptional cooking<br/> class tailored for you!</h1>
            <p className="mb-5"> Explore Low-Calorie Recipes for Every Meal. Taste the Goodness Without the Guilt. Your Path to Healthier Eating Starts Here.</p>
            <button className="buy p-4 bg-green-600 text-black font-bold text-lg rounded-2xl">Explore Now</button>
            <button className="buy p-4 ml-6 border-2 font-bold text-lg rounded-2xl">Our Feedback</button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl mt-10 text-center font-bold">Our Recipes</h2>
        <p className="mt-4 text-center">Explore our diverse range of recipes and discover how easy it is to enjoy wholesome meals that nourish both body and soul. <br/> Savor Flavor, Trim Calories Indulge in Our Delectable Low-Calorie Recipes
        </p>
      </div>

      <div className='mt-10'>
        <div className='main-container'>
          <div className='cards-container'>
            {products.map((recipe) => (
              <SingleRecipe
                key={recipe.recipe_id}
                recipe={recipe}
                handleCart={handleCart}
                handlePreparing={handlePreparing}
              />
            ))}
      </div>
      <div className='cart-container'>
        <div className="cart">
          <h3 className="text-center font-bold text-xl mt-8">Want to cook : {cart.length}</h3>
          <div className="cart-items text-lg mt-6">
            <div className="cart-title font-semibold">
              <h5>Name</h5>
              <h5>Time</h5>
              <h5>Calories</h5>
            </div>
            <div className="cart-info">
              {cart.map((item, index) => (
                <div key={item.recipe_id} className="cart-item">
                  <p>{index + 1}</p>
                  <h5 className="w-24">{item.recipe_name}</h5>
                  <h5>{item.preparing_time}</h5>
                  <h5 className="w-20 ml-4">{item.calories}</h5>
                  <button onClick={() => handlePreparing(item)} className="bg-green-600 p-2 rounded-xl h-14 text-white">Preparing</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cart">
          <h3 className="text-center font-bold text-xl mt-8">Currently Cooking : {currentlyCooking.length}</h3>
          <div className="cart-items text-lg mt-6">
            <div className="cart-title font-semibold gap-24">
              <h5>Name</h5>
              <h5>Time</h5>
              <h5>Calories</h5>
            </div>
            <div className="cart-info mr-6">
              {currentlyCooking.map((item, index) => (
                <div key={item.recipe_id} className="cart-item">
                  <p>{index + 1}</p>
                  <h5 className="w-24 mr-10">{item.recipe_name}</h5>
                  <h5 className="mr-14">{item.preparing_time}</h5>
                  <h5>{item.calories}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
     
      <div className="totals-container flex text-lg mt-14">
        <div className="total-time w-24 ml-14">
          <p>Total Time = {calculateTotalTime([...cart, ...currentlyCooking])} min</p>
        </div>
        <div className="total-calories w-28 ml-24">
          <p>Total Calories = {calculateTotalCalories([...cart, ...currentlyCooking])}</p>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default App;

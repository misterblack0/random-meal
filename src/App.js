import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Header = styled.header`
text-align: center;
`;

const Button = styled.button`
font-weight: 700;
background-color: #4096EE;
color: white;
border: none;
text-transform: uppercase;
border-radius: 3px;
padding: 12px;
`;

const Body = styled.main`
${'' /* background-color: gray; */}
margin: 3rem 18rem;
display: flex;
flex-direction: column;

div {
  display: flex;
}

img {
  height: 400px;
  border-radius: 3px;
}

.instructions {
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
  width: 50%;
}

.info,
.videoWrapper {
  display: flex;
  flex-direction: column;
}
`
function App() {

  const [data, setData] = useState('');

  const getData = async () => {
    const response = await axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .catch((error) => {
        console.log("Error: ", error);
      });
    if (response && response.data) setData(response.data.meals[0]);
  };

  // Create an empty array of 20 ingredients
  let emptyArr  = [...Array(21).keys()].slice(1);
  emptyArr = emptyArr.map(i => "strIngredient" + i);

  // Convert object to array
  const ingredientsArr = Object.keys(data)
  .filter(key => emptyArr.includes(key))
  .reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
  }, {});

  // Remove empty values from array
  const removeEmptyIngr = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };

  const handleClick = () => {
    getData()
  }

  return (
    <>
    <Header>
      <h1>Feeling hungry?</h1>
      <h2>Get a random meal by clicking below</h2>
      <Button onClick={handleClick}>Get meal</Button>
    </Header>

    {data &&
      <div>
    <Body>
    <div>
      <img alt="meal" src={data.strMealThumb} />
      <div className="instructions">
      <h2>{data.strMeal}</h2>
      <p>{data.strInstructions}</p>
      </div>
      </div>
      <div className="info">
      <p><strong>Category:</strong> {data.strCategory}</p>
    <p><strong>Area:</strong> {data.strArea}</p>
    {data.strTags && <p><strong>Tags:</strong> {data.strTags}</p>}

    <h3>Ingredients:</h3>
    <ul>
    {Object.values(removeEmptyIngr(ingredientsArr)).map (ing => <li key={ing}>{ing}</li>)}
    </ul>
      </div>
      {data.strYoutube &&
      <div className="videoWrapper">
      Video Recipe
       <iframe title="video" width="420" height="315"  src={`https://www.youtube.com/embed/${data.strYoutube.slice(-11)}`}/>
      </div>}
    </Body>
    </div>}

    </>
  );
}

export default App;

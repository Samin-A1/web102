import { useState } from 'react';
import stringSimilarity from 'string-similarity';
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const [form, setForm] = useState ({guess: " "});
  const [feedback, setFeedback] = useState(" ");
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const [flashcards, setFlashcards] = useState ([
    {
      front: "Do YOU know your art terms? Test them here!",
      back: "This is a set of 10 cards that can be used to test your knowledge on art!",
      image: "https://cdn-icons-png.flaticon.com/512/4893/4893176.png"
    },
    {
      front: "One of the elements of art that dictates how light or dark a color appears.",
      back: "Value",
      image: "https://www.virtualartacademy.com/wp-content/uploads/2021/03/Screenshot-2021-03-01-at-17.55.56.png"
    },
    {
      front: "An artistic technique used to create tonal or shading effects by drawing closely spaced parallel lines.",
      back: "Hatching",
      image: "https://www.erikalancaster.com/uploads/4/4/3/3/4433786/published/hatching_2.jpg?1531517944"
    },
    {
      front: "An artistic technique used to create tonal or shading effects by drawing closely spaced parallel lines that are placed at an angle to one another.",
      back: "Cross hatching",
      image: "https://www.erikalancaster.com/uploads/4/4/3/3/4433786/cross-hatching_3_orig.jpg"
    },
    {
      front: "A mechanism of light transport in which light that penetrates the surface of a translucent object is scattered by interacting with the material and exits the surface potentially at a different point.",
      back: "Subsurface scattering",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06d4d763-9fb0-4ffb-a5af-3e7d2008c376/daw0240-573b829d-8688-4ed7-961b-a0f6b53b898c.jpg/v1/fill/w_966,h_827,q_70,strp/subsurface_scattering_tutorial_by_cgcookie_daw0240-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODc3IiwicGF0aCI6IlwvZlwvMDZkNGQ3NjMtOWZiMC00ZmZiLWE1YWYtM2U3ZDIwMDhjMzc2XC9kYXcwMjQwLTU3M2I4MjlkLTg2ODgtNGVkNy05NjFiLWEwZjZiNTNiODk4Yy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.J_mrFZZXMsTJcbnB4kFEPOluyfU0wWQZow6ispIfuuw"
    },
    {
      front: "The line by which an object's light and shadow sides are separated.",
      back: "Terminator",
      image: "https://64.media.tumblr.com/ec65d73dae12ba86e385000399290548/tumblr_inline_pcfrpc6KZ41r47c4h_500.jpg"
    },
    {
      front: "The study of how colors work together and how they affect our emotions and perceptions.",
      back: "Color theory",
      image: "https://emagazine.aggv.ca/wp-content/uploads/2022/02/colour-wheel.jpg"
    },
    {
      front: "One color or hue.",
      back: "Monochromatic",
      image: "https://northwoodsmnart.weebly.com/uploads/1/2/8/3/12836796/5542244.gif?263"
    },
    {
      front: "Two or more colors that are side by side on the color wheel and often contain the same primary color.",
      back: "Analogous",
      image: "https://www.thespruce.com/thmb/D6MpWlti9Tkvd6OeG4IIl-syigc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/understanding-analogous-colors-1973820-final-2065c73748b146e4a92b377a18772353.png"
    },
    {
      front: "Pairs of colors that contrast with each other more than any other color.",
      back: "Complementary",
      image: "https://phlearn.com/wp-content/uploads/2019/09/Complementary-Colors.jpg"
    },
    {
      front: "A shadowing technique used to make 3d objects look more realistic by simulating the soft shadows that should naturally occur when indirect or ambient lighting is cast.",
      back: "Ambient occlusion",
      image: "https://ars.els-cdn.com/content/image/3-s2.0-B9781558606593500172-f15-16-9781558606593.jpg"
    }
  ]);

  const shuffleFlashcards = () => {
    const shuffledFlashcards = [...flashcards];
    shuffledFlashcards.sort(() => Math.random() - 0.5);
    setCount(0);
    setFeedback("");
    setStreak(0);
    setFlashcards(shuffledFlashcards);
  };

  const removeCard = () => {
    setMasteredCards([...masteredCards, flashcards[count]]);
    console.log(masteredCards);
    const newFlashcards = flashcards.filter((card, index) => index !== count);
    setFlashcards(newFlashcards);
    if (count === newFlashcards.length) {
      setCount(count - 1);
    }
    setFeedback("");
  }

  const handleForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  
  const guessCard = (event) => {
    event.preventDefault();
    const guessedAnswer = form.guess.trim().toLowerCase();
    const correctAnswer = flashcards[count].back.toLowerCase();

    const similarity = stringSimilarity.compareTwoStrings(guessedAnswer, correctAnswer);
    const threshold = 0.7;

    if (similarity >= threshold) {
      if (!isFlipped) {
        clickForward();
        setFeedback("Correct!");
        setStreak(streak + 1);
        if (streak + 1 > maxStreak) {
          setMaxStreak(streak + 1);
        }
      } else {
        clickForward();
        setFeedback("Correct! But try guessing next time!");
      }
    } else {
      setFeedback("Incorrect! Try again.");
      setStreak(streak - streak);
    }
    
    setForm({guess: ''});
  }

  const clickCard = () => {
    setFlipped(!isFlipped);
  }

  const clickForward = () => {
    if (count < flashcards.length-1) {
      setCount(count + 1);
      setFlipped(false);
      setFeedback("");
    }
  }

  const clickBackward = () => {
    if (count > 0) {
      setCount(count - 1);
      setFlipped(false);
      setFeedback("");
    }
  }

  return (
    <>
      <h1>Art Quiz</h1>
      <h2>10 flash cards to test your art knowledge!</h2>
      <h3>Max Streak: {maxStreak}</h3>
      <h3>Current Streak: {streak}</h3>

      <button onClick={shuffleFlashcards} style={{color: 'yellow'}}>Shuffle Cards</button>

      <div>
        <button className={`card ${isFlipped ? "flip" : ""}`} onClick={clickCard}>
          {isFlipped ? (
            flashcards[count].back
            ) : (
            <>
            <img className='image' src={flashcards[count].image} alt={`Card ${count + 1}`} />
            <div>{flashcards[count].front}</div>
            </>
            )}
        </button>

      </div>

      <div>
        <form onSubmit={guessCard}>
          <label htmlFor='Place your answer here...'>Guess the answer here:</label><br/>
          <input
            value={form.guess}
            onChange={handleForm}
            type="text" 
            name="guess" 
            id="guess" 
          />
          <button type="submit" style={{color: 'lime'}}>Submit Guess</button>
        </form>
        
        <div>
          {feedback}
        </div>

      </div>

      <div>
        <button className='backward' onClick={clickBackward} disabled={count === 0}>&larr;</button>
        <button className='forward' onClick={clickForward} disabled={count === flashcards.length - 1}>&rarr;</button>

      </div>

      <button onClick={removeCard} style={{color: 'red'}}>Remove Current Card</button>

      <div className='mastered-cards'>
        <h3>Mastered Flashcards:</h3>
        {masteredCards.map((card, index) => (
          <div> - {card.back}</div>
        ))}
      </div>

    </>
  )
}

export default App

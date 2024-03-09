import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [isFlipped, setFlipped] = useState(false);

  const flashcards = [
    {
      front: "Ready to learn how to draw?:",
      back: "--This is a step by step how to guide so YOU can get started on your art journey! click the -> arrow to go to the next card!",
      image: "https://cdn-icons-png.flaticon.com/512/4893/4893176.png"
    },
    {
      front: "Get your tools:",
      back: "--For now, we'll work with (pen)cil and paper! Later you can try out paint or whatever you'd like!",
      image: "https://images.newscientist.com/wp-content/uploads/2015/03/dn27189-1_800.jpg?width=800"
    },
    {
      front: "Familiarize yourself with common gestures:",
      back: "--This can include practicing straight lines, curves, shapes, and other common gestures!",
      image: "https://lh3.googleusercontent.com/proxy/dydGd7QJtfOMPXd4jaBZxVtE0nK0SUyeogcTDjBwGQZyQcQuublL202pvs9mSorcAFQgInYiKgEMhkrolAo63T2xe4qRaOHcUZgEBs5c4qyDjQKkBhresuYCOBvT1Rp6TXTvoQ"
    },
    {
      front: "Challenge 1:",
      back: "--Draw a square, and try to fill it up with parallel lines in any direction. Make sure not to go outside the box! (Parallel lines drawn in this fashion are referred to as hatching!)",
      image: "https://www.erikalancaster.com/uploads/4/4/3/3/4433786/published/hatching_2.jpg?1531517944"
    },
    {
      front: "Shading:",
      back: "--Try drawing a bunch of 3d shapes with a light source, and shade them. (Make sure to use references!!!). Some examples include: Cubes, Spheres, Rectangular prisms, Cylinders and more!",
      image: "https://thevirtualinstructor.com/images/spherereference.jpg"
    },
    {
      front: "Coloring:",
      back: "--Try your hand at some basic color theory! Some easy relationships to learn about are monochromatic, analogous, and complementary colors.",
      image: "https://media.witanddelight.com/content/uploads/2020/07/21163611/Color-Theory-Graphics_v1_Complimentary-Colors-1-1600x811.png"
    },
    {
      front: "Challenge 2:",
      back: "--Find an object you think looks interesting. Now, take a picture for reference and try drawing it and shading it in as accurately as possible. If you want to go even further, try coloring it!",
      image: "https://www.artyfactory.com/still-life/images/still_life_pencil_8.jpg"
    },
    {
      front: "Perspective:",
      back: "--This one's rough. Try choosing a vanishing point (The point at which objects are too small to be seen), and draw 3d objects in perspective relative to that vanishing point! If that gets too easy, try two-point perspective (Two vanishing points).",
      image: "https://i.pinimg.com/474x/ba/07/3d/ba073dbea92b2e7befb9cbe58e2f025e.jpg"
    },
    {
      front: "Anatomy:",
      back: "--Look at references of the human body and try measuring each part relative to the other parts. For example, how long are your forearms compared to your upper arms? Your head compared to the length of your body? In addition to that, start learning more about what's happening underneath: Muscles, Skeletal Structure, etc.",
      image: "https://cdn.tutsplus.com/cdn-cgi/image/width=600/vector/uploads/2013/10/2-Sum-up.jpg"
    },
    {
      front: "Challenge 3:",
      back: "--Try drawing a face in a forward perspective, a 3/4 perspective, and a side profile! (Use a reference!!!)",
      image: "https://i.pinimg.com/736x/97/88/30/978830736e096f92c416bd21b8f6da71.jpg"
    },
    {
      front: "Get creative:",
      back: "--Try drawing whatever you'd like, but not directly from a reference. Maybe a mystical forest with glowing blue fungi, or maybe a ninja with sci-fi space armor; it can be whatever you want. (You can still use references, but don't just copy the reference material !!!)",
      image: "https://i.pinimg.com/originals/07/88/44/078844a79c5a9ba02ecb68716f60023a.png"
    },
    {
      front: "Share your art:",
      back: "--Proud of your work? Time to share it with the world! You can do so via social media, or maybe just sharing with friends and family. From here you get a different perspective on your art, or maybe just the encouragement you need to go further! Good luck on your art journey!!",
      image: "https://static.vecteezy.com/system/resources/previews/024/029/924/original/social-media-icons-clipart-transparent-background-free-png.png"
    }
  ];

  const clickCard = () => {
    setFlipped(!isFlipped);
  }

  const clickForward = () => {
    if (count < flashcards.length-1) {
      setCount(count + 1);
      setFlipped(false);
    }
  }

  const clickBackward = () => {
    if (count > 0) {
      setCount(count - 1);
      setFlipped(false);
    }
  }

  return (
    <>
      <h1>Learn How to Draw</h1>
      <h2>12 flash cards to teach you how to draw!</h2>
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
        <button className='backward' onClick={clickBackward} disabled={count === 0}>&larr;</button>
        <button className='forward' onClick={clickForward} disabled={count === flashcards.length - 1}>&rarr;</button>

      </div>
    </>
  )
}

export default App

export const SelectTravelList = [
    {
      id: 1,
      title: "Solo Adventure",
      desc: "Embark on a journey of self-discovery",
      icon: "🎒",
      people: "1 person",
    },
    {
      id: 2,
      title: "Romantic Getaway",
      desc: "Experience the world together",
      icon: "💑",
      people: "2 people",
    },
    {
      id: 3,
      title: "Family Fun",
      desc: "Create unforgettable memories with loved ones",
      icon: "🏠",
      people: "3 to 4 people",
    },
    {
      id: 4,
      title: "Friends' Escapade",
      desc: "Thrilling adventures with your best pals",
      icon: "🧑‍🤝‍🧑",
      people: "5 to 10 people",
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: "Budget-Friendly",
      desc: "Travel smart, spend less",
      icon: "💸",
    },
    {
      id: 2,
      title: "Moderate",
      desc: "Balance comfort and cost",
      icon: "💵",
    },
    {
      id: 3,
      title: "Luxury",
      desc: "Indulge in lavish experiences",
      icon: "💎",
    },
  ];
  
  export const AI_PROMPT = `
    Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget Give me a Hotels options list with Hotel Name(real hotel), Hotel address(real address of that hotel), Price, hotel image url(real image url of that hotel), geo coordinates, rating descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each Of the location for {totalDays} days with each day plan with best time(give it as 4:00PM - 5:00PM) to visit the place in JSON format.

    
  `;
  export const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
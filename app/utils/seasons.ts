type Season = "Rainy" | "Dry";

interface SeasonInfo {
  name: Season;
  description: string;
  months: string;
}

export function getSeason(month: number): SeasonInfo {
  if (month >= 11 || month <= 3) {
    return {
      name: "Rainy",
      description:
        "The rainy season in Jakarta is characterized by frequent rainfall, higher humidity, and occasional flooding.",
      months: "November to March",
    };
  } else {
    return {
      name: "Dry",
      description:
        "The dry season in Jakarta features less rainfall, lower humidity, and generally clearer skies.",
      months: "April to October",
    };
  }
}

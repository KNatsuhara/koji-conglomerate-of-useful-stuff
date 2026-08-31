import Jaemie from "../welcome-jaemie-page/jaemie";
import jaemieThumb from "../../assets/jaemie-assets/jaemie.jpg";
import Random from "../random-page/random";
import randomThumb from "../../assets/random-assets/random.jpg";
import Stocks from "../stocks-page/stocks";

export interface PageConfig {
  path: string;
  title: string;
  thumbnail: string;
  component: React.ComponentType;
}

export const pages: PageConfig[] = [
  {
    path: "/app",
    title: "Welcome Jaemie",
    thumbnail: jaemieThumb,
    component: Jaemie,
  },
  {
    path: "/random",
    title: "Random",
    thumbnail: randomThumb,
    component: Random,
  },
  {
    path: "/stocks",
    title: "Stocks",
    thumbnail: randomThumb,
    component: Stocks,
  },
];

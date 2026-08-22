import App from "./App";
import jaemieThumb from "./assets/jaemie_assets/jaemie.jpg";
import Random from "./random";
import randomThumb from "./assets/random_assets/random.jpg";

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
    component: App,
  },
  {
    path: "/random",
    title: "Random",
    thumbnail: randomThumb,
    component: Random,
  },
];
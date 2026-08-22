import { Link } from "react-router-dom";
import "./Home.css";
import { pages } from "./pages";

function Home() {
  return (
    <>
    <h1>Koji's Conglomerate of Useful Stuff</h1>
    <div className="home-grid">
      {pages.map((page) => (
        <Link to={page.path} className="thumbnail-link" key={page.path}>
          <div className="thumbnail-card">
            <img
              src={page.thumbnail}
              alt={page.title}
              className="thumbnail-image"
            />
            <h2 className="thumbnail-title">{page.title}</h2>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}

export default Home;

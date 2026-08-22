import randomImg from './assets/random_assets/random.jpg';

function Random() {
  return (
    <>
    <h1>Random</h1>
    <div>
        <img src={randomImg} width="384" height="510" alt="Jaemie Pic" />
    </div>
    </>
  );
}

export default Random;
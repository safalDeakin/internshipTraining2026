import ListHeader from "./components/ListHeader"
import ListHeroSection from "./components/ListHeroSection"


const App = () => {
  return (
    <>
      <div className="page">
        <h1>List-One Line</h1>
        <div className="main-card">
          <ListHeader />
          <ListHeroSection />
        </div>
      </div>
    </>
  )
}

export default App
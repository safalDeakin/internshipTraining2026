import ListHeader from "./ListHeader"
import ListHeroSection from "./ListHeroSection"


const Offers = () => {
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

export default Offers
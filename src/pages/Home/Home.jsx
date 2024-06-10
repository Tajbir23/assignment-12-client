import Banner from "./Banner"
import FeaturedTest from "./FeaturedTest"
import PersonalizedRecommendation from "./PersonalizedRecommendation"
import Promotions from "./Promotions"


const Home = () => {
  return (
    <div>
        <Banner />
        <FeaturedTest />
        <Promotions />
        <PersonalizedRecommendation />
    </div>
  )
}

export default Home
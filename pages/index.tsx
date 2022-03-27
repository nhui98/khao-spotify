import GradientLayout from "../components/gradientLayout/gradientLayout"

const Home = () => {
  return (
    <GradientLayout color='blue' subtitle='profile' title='Khao' image='/avatar.jpg' description='this is a description' isRoundImg>
      <div>hello</div>
    </GradientLayout>
  )
}

export default Home

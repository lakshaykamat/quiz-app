import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import LiveStats from './components/LiveStats/LiveStats'
import Leaderboard from './components/Leaderboard/Leaderboard'
import Achievements from './components/Achievements/Achievements'
import Resources from './components/Resources/Resources'
import Newsletter from './components/Newsletter/Newsletter'
import AboutFeedback from './components/AboutFeedback/AboutFeedback'
import QuizSection from './components/QuizSection/QuizSection'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
    <Navbar />
    <Hero/>
    <QuizSection/>
    <LiveStats/>
    <Leaderboard/>
    <Achievements/>
    <Resources/>
    <Newsletter/>
    <AboutFeedback/>
  </div>
  )
}

export default HomePage
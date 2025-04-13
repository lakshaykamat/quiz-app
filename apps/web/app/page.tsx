import React from 'react'
import { Button } from "@/components/ui/button"
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import QuizCardsSection from './components/QuizCardSection'
import LiveStatsSection from './components/LiveStatsSection'
import LeaderboardSection from './components/LeaderboardSection'
import NewsletterSection from './components/NewsLetterSection'
import Footer from './components/Footer'
import AchievementsSection from './components/AchievementSection'
type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
    <HeroSection/>
    <QuizCardsSection/>
    <hr />
    <LiveStatsSection/>
    <LeaderboardSection/>
    <hr />
    <NewsletterSection/>
    <AchievementsSection/>
    <Footer/>
    </div>
  )
}

export default HomePage
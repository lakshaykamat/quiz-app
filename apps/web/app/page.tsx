import React from 'react'
import HeroSection from './components/HeroSection'
import QuizCardsSection from './components/QuizCardSection'
import LiveStatsSection from './components/LiveStatsSection'
import LeaderboardSection from './components/LeaderboardSection'
import NewsletterSection from './components/NewsLetterSection'
import Footer from './components/Footer'
import AchievementsSection from './components/AchievementSection'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
type Props = {}

const HomePage = async (props: Props) => {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")?.value
  if(token){
    console.log("Token found in cookies:", token);
    redirect("/dashboard")
  }
  
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
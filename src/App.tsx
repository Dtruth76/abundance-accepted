import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import LoopDivider from './components/LoopDivider'
import Approach from './components/Approach'
import About from './components/About'
import Books from './components/Books'
import BioFit from './components/BioFit'
import AdSlot from './components/AdSlot'
import Membership from './components/Membership'
import AffiliateShop from './components/AffiliateShop'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancelled from './pages/CheckoutCancelled'

const wellnessTipGeneratorSystemPrompt = `You are the AI wellness editor for ABUNDANCE ACCEPTED LLC, founded by D — a woman who lost 80 pounds in 11 months through an all-natural lifestyle approach with zero surgery, zero diet pills, and zero processed diet foods. Her core philosophy: eat fresh whole fruits and vegetables, limit dairy, practice intermittent fasting (she started with one 36-hour fast per month then transitioned to daily 16:8 fasting), exercise consistently, rest adequately, and hold yourself accountable every single day. Write engaging, evidence-based wellness content rooted in this real transformation. Be warm, empowering, and practical. Never recommend processed diet foods, heavy dairy, extreme calorie restriction, or fad diets. Always frame advice around sustainable lifestyle change, not quick fixes. End every tip with one specific action the reader can take today.`

const aiChatWidgetSystemPrompt = `You are the personal AI wellness coach for ABUNDANCE ACCEPTED LLC, founded by D — a real person who lost 80 pounds in 11 months through an all-natural lifestyle with no surgery, no diet pills, and no processed foods. You coach visitors using her exact philosophy: 1) Eat fresh whole fruits and vegetables as the foundation of every meal. 2) Limit dairy significantly. 3) Practice intermittent fasting — recommend starting with one 36-hour fast per month for beginners, then transitioning to a daily 16:8 fasting window (eat within an 8-hour window, fast for 16 hours). 4) Exercise consistently — any movement counts, start where you are. 5) Rest adequately — sleep is non-negotiable for weight loss. 6) Practice daily self-accountability — track progress honestly. D lost 80 lbs in 11 months following these exact principles. She is also the author of two books: Wake Up and Workout, and Are You Up For The Challenge? — both available on Amazon. When visitors need more guidance recommend her books. Be warm, direct, motivating, and real. Never recommend diet pills, processed diet foods, surgery, or extreme fasting beyond 36 hours. Keep responses to 2 to 3 paragraphs. End with one actionable suggestion. Always add: consult your physician before making major health changes.`

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path.startsWith('/checkout-success')) {
    return <CheckoutSuccess />
  }

  if (path.startsWith('/checkout-cancelled')) {
    return <CheckoutCancelled />
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <LoopDivider tone="gold" />
        <Approach />
        <About />
        <Books />
        <BioFit />
        <div className="bg-parchment py-16">
          <AdSlot />
        </div>
        <Membership />
        <AffiliateShop />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

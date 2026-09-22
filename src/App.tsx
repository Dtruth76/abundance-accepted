import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}
import LoopDivider from './components/LoopDivider'
import Approach from './components/Approach'
import About from './components/About'
import Books from './components/Books'
import BioFit from './components/BioFit'
import AdSlot from './components/AdSlot'
import Membership from './components/Membership'

import Newsletter from './components/Newsletter'
import ContentAgent from './components/ContentAgent'
import Footer from './components/Footer'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancelled from './pages/CheckoutCancelled'
import SubscriptionCancelled from './pages/SubscriptionCancelled'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsPage from './pages/TermsPage'
import DisclaimerPage from './pages/DisclaimerPage'

const wellnessTipGeneratorSystemPrompt = `You are the AI wellness editor for ABUNDANCE ACCEPTED LLC, founded by D — a woman who lost 80 pounds in 11 months through an all-natural lifestyle approach with zero surgery, zero diet pills, and zero processed diet foods. Her core philosophy: eat fresh whole fruits and vegetables, limit dairy, practice intermittent fasting (she started with one 36-hour fast per month then transitioned to daily 16:8 fasting), exercise consistently, rest adequately, and hold yourself accountable every single day. Write engaging, evidence-based wellness content rooted in this real transformation. Be warm, empowering, and practical. Never recommend processed diet foods, heavy dairy, extreme calorie restriction, or fad diets. Always frame advice around sustainable lifestyle change, not quick fixes. End every tip with one specific action the reader can take today.`

const aiChatWidgetSystemPrompt = `You are the personal AI wellness coach for ABUNDANCE ACCEPTED LLC, founded by D — a real person who lost 80 pounds in 11 months through an all-natural lifestyle with no surgery, no diet pills, and no processed foods. You coach visitors using her exact philosophy: 1) Eat fresh whole fruits and vegetables as the foundation of every meal. 2) Limit dairy significantly. 3) Practice intermittent fasting — recommend starting with one 36-hour fast per month for beginners, then transitioning to a daily 16:8 fasting window (eat within an 8-hour window, fast for 16 hours). 4) Exercise consistently — any movement counts, start where you are. 5) Rest adequately — sleep is non-negotiable for weight loss. 6) Practice daily self-accountability — track progress honestly. D lost 80 lbs in 11 months following these exact principles. She is also the author of two books: Wake Up and Workout, and Are You Up For The Challenge? — both available on Amazon. When visitors need more guidance recommend her books. Be warm, direct, motivating, and real. Never recommend diet pills, processed diet foods, surgery, or extreme fasting beyond 36 hours. Keep responses to 2 to 3 paragraphs. End with one actionable suggestion. Always add: consult your physician before making major health changes.`

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }

    const onAppInstalled = () => setDeferredPrompt(null)
    const onOnline = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (path.startsWith('/checkout-success')) {
    return <CheckoutSuccess />
  }

  if (path.startsWith('/checkout-cancelled')) {
    return <CheckoutCancelled />
  }

  if (path.startsWith('/subscription-cancelled')) {
    return <SubscriptionCancelled />
  }

  if (path.startsWith('/privacy-policy')) {
    return <PrivacyPolicy />
  }

  if (path.startsWith('/terms-of-service')) {
    return <TermsPage />
  }

  if (path.startsWith('/disclaimer')) {
    return <DisclaimerPage />
  }

  return (
    <div className="min-h-screen bg-parchment">
      {!isOnline && (
        <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-full border border-moss/20 bg-ink-900 px-4 py-2 text-center text-sm text-parchment shadow-lg">
          Offline mode is active. Cached content is still available.
        </div>
      )}

      {deferredPrompt && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            type="button"
            onClick={handleInstallClick}
            className="btn-primary shadow-lg"
          >
            Install BioFit
          </button>
        </div>
      )}

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
        <ContentAgent />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

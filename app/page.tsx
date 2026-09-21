import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Timer, Trophy, Zap, Shield, Users, Coins } from "lucide-react"

export const metadata = {
  title: "Last Staker Wins — Electroneum Blockchain Game",
  description:
    "The last player to stake ETN before the countdown hits zero wins 70% of the prize pool. Stake. Wait. Win. Built on the Electroneum Testnet.",
}

export default function LandingPage() {
  return (
    <main className="lsw-landing">
      {/* Animated background grid */}
      <div className="landing-bg" aria-hidden="true">
        <div className="grid-overlay" />
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <header className="landing-nav">
        <Link href="/" className="landing-logo">
          <Image src="/LSW-logo.png" alt="Last Staker Wins" width={36} height={36} className="logo-img" />
          <span>
            Last Staker<em>Wins</em>
          </span>
        </Link>

        <nav className="landing-site-nav" aria-label="Primary navigation">
          <Link href="/" className="nav-link active">
            Home
          </Link>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </nav>

        <div className="landing-nav-right">
          <div className="network-pill">
            <i className="network-dot" />
            Electroneum Testnet
          </div>
          <Link href="/dashboard" className="launch-btn">
            Launch App <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="hero-section" id="top">
        <div className="hero-eyebrow">
          COMPETITIVE STAKING GAME <span>•</span> ELECTRONEUM TESTNET
        </div>

        <h1 className="hero-headline">
          Stake last.
          <br />
          <em>Win everything.</em>
        </h1>

        <p className="hero-lede">
          Last Staker Wins is a high-stakes countdown game on the Electroneum blockchain.
          Every stake resets the timer. The final player to stake before it hits zero
          walks away with <strong>70% of the entire prize pool.</strong>
        </p>

        <div className="hero-actions">
          <Link href="/dashboard" className="primary-cta">
            Play Now <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/dashboard" className="secondary-cta">
            View Dashboard
          </Link>
        </div>

        {/* Live stats bar */}
        <div className="live-stats-bar">
          <div className="live-badge">
            <span className="live-dot" />
            LIVE
          </div>
          <div className="stat-item">
            <Coins size={14} />
            <span>0.01 ETN minimum stake</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <Timer size={14} />
            <span>Timer resets every stake</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <Trophy size={14} />
            <span>70% to last staker</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section className="how-section">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-title">Three simple rules</h2>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">
              <Zap size={24} />
            </div>
            <h3>Connect & Stake</h3>
            <p>
              Connect your MetaMask wallet on Electroneum Testnet and stake the minimum
              amount (0.01 ETN) to enter the round.
            </p>
          </article>

          <article className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">
              <Timer size={24} />
            </div>
            <h3>Watch the Timer</h3>
            <p>
              Every new stake resets the countdown by 5 minutes. The game continues as
              long as players keep staking before the timer reaches zero.
            </p>
          </article>

          <article className="step-card step-card-accent">
            <div className="step-number">03</div>
            <div className="step-icon">
              <Trophy size={24} />
            </div>
            <h3>Last One Wins</h3>
            <p>
              When the timer finally hits zero, the last person who staked wins 70% of
              the prize pool. No tricks. Pure on-chain logic.
            </p>
          </article>
        </div>
      </section>

      {/* ── PRIZE BREAKDOWN ────────────────────────────── */}
      <section className="prize-section">
        <div className="section-label">PRIZE DISTRIBUTION</div>
        <h2 className="section-title">Where does the ETN go?</h2>

        <div className="prize-grid">
          <div className="prize-card prize-winner">
            <div className="prize-percent">70%</div>
            <div className="prize-label">Last Staker</div>
            <div className="prize-desc">The winner takes the majority of the pool</div>
          </div>
          <div className="prize-card prize-participants">
            <div className="prize-percent">20%</div>
            <div className="prize-label">Random Participants</div>
            <div className="prize-desc">Randomly selected participants share this</div>
          </div>
          <div className="prize-card prize-treasury">
            <div className="prize-percent">10%</div>
            <div className="prize-label">Treasury</div>
            <div className="prize-desc">Protocol sustainability and development</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────── */}
      <section className="features-section">
        <div className="features-grid">
          <article className="feature-card">
            <Shield size={22} className="feature-icon" />
            <h3>On-Chain by Design</h3>
            <p>All game logic lives in a verified smart contract on Electroneum. No off-chain servers control the outcome.</p>
          </article>

          <article className="feature-card">
            <Users size={22} className="feature-icon" />
            <h3>Open to Everyone</h3>
            <p>Any wallet connected to Electroneum Testnet can join. Each round starts fresh with a new prize pool.</p>
          </article>

          <article className="feature-card">
            <Zap size={22} className="feature-icon" />
            <h3>Real-Time Feed</h3>
            <p>Watch live stake events appear in the activity feed as they hit the blockchain. Full transparency.</p>
          </article>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section className="cta-banner">
        <h2>Ready to be the last staker?</h2>
        <p>Connect your wallet and join the current round on Electroneum Testnet.</p>
        <Link href="/dashboard" className="primary-cta">
          Go to Dashboard <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="footer-left">
          <Image src="/LSW-logo.png" alt="LSW" width={22} height={22} className="logo-img" />
          <span>Last Staker Wins</span>
          <span className="footer-divider">•</span>
          <span>Non-custodial. On-chain. Transparent.</span>
        </div>
        <div className="footer-right">
          <a
            href="https://testnet-blockexplorer.electroneum.com/address/0x9341C730ceeB5Ead8b44939d56275eC4a7654Cf2"
            target="_blank"
            rel="noreferrer"
          >
            View Contract ↗
          </a>
        </div>
      </footer>
    </main>
  )
}

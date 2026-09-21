# Last Staker Wins (LSW) - Electroneum Blockchain

**Last Staker Wins (LSW)** is a competitive decentralized Web3 game built on the **Electroneum (ETN) Blockchain**. Players stake native ETN tokens to become the last staker before the round countdown expires. The game combines timing, strategy, and fair reward distribution with late-stake deadline extensions.

---

## 🚀 Quick Links & Submission Metadata

* **dApp / Prototype:** [https://lsw-electroneum-seven.vercel.app/](https://lsw-electroneum-seven.vercel.app/)
* **Network:** Electroneum Testnet (Chain ID `5201420`) / Electroneum Mainnet (Chain ID `52014`)
* **Currency:** Native `ETN` (18 decimals)

---

## 📊 Technical Deliverables & Features

### 1. 📱 Usable dApp / Prototype
* **Real-time Round Countdown:** Dynamic game timer showing time remaining and staking wait periods.
* **1-Click Staking Interface:** Easily stake minimum ETN (`0.01 ETN`) directly from MetaMask or any injected Web3 wallet.
* **Prize Pool Breakdown:** Visual pool distribution showing 70% Winner, 20% Random Participants, and 10% Treasury share.
* **Live EVM Activity Feed:** Automatic real-time tracking of `StakeReceived`, `RoundStarted`, `RoundEnded`, and `RewardsDistributed` events on Electroneum.
* **Round History:** Comprehensive history of past winners and reward payouts.

### 2. 💻 Electroneum Smart Contracts ([`smartcontract/`](./smartcontract))
* **LSW Contract (`LSW.sol`):** Manages round initialization, stake collection, buffer deadline extensions, and distribution triggers.
* **Rewarder Contract (`rewarder.sol`):** Allocates participant rewards evenly or pseudo-randomly among round stakers.

**Deployed Contract Addresses (Electroneum Testnet):**
* **LSW Contract:** `0x9341C730ceeB5Ead8b44939d56275eC4a7654Cf2`
* **Rewarder Contract:** `0xb33A94Bf2c58AA7cAdA03c219860ecDf7DaeD299`


### 3. 📝 Setup Guide & Documentation

#### Prerequisites
* Node.js v18+
* npm or pnpm
* MetaMask or Web3 Wallet configured for Electroneum

#### Electroneum Network Configuration
Add Electroneum Testnet or Mainnet to your wallet:

| Parameter | Electroneum Testnet | Electroneum Mainnet |
| :--- | :--- | :--- |
| **Network Name** | Electroneum Testnet | Electroneum Mainnet |
| **Chain ID** | `5201420` | `52014` |
| **RPC URL** | `https://rpc.ankr.com/electroneum_testnet` | `https://rpc.electroneum.com` |
| **Currency Symbol** | `ETN` | `ETN` |
| **Block Explorer** | `https://testnet-blockexplorer.electroneum.com` | `https://blockexplorer.electroneum.com` |

#### Local Development Setup
```bash
# 1. Clone the repository
git clone https://github.com/Skinny001/LSW-Somnia.git
cd LSW-Somnia

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env.local

# 4. Start local development server
npm run dev

# 5. Open in browser
# Visit http://localhost:3000
```

#### Smart Contract Compilation & Deployment (Foundry)
```bash
cd smartcontract

# Compile contracts
forge build

# Deploy to Electroneum Testnet
forge script script/LSW.s.sol:LSWScript \
  --rpc-url https://rpc.ankr.com/electroneum_testnet \
  --private-key YOUR_PRIVATE_KEY \
  --broadcast
```

---

## 🎮 Game Mechanics & Flow

```mermaid
graph TD
    A[🎯 Round Start] --> B[⏳ Staking Wait Period<br/>3 minutes]
    B --> C[💰 Staking Open]
    C --> D{💸 New ETN Stake?}
    D -->|Yes| E[⏰ Within Buffer Period?]
    E -->|Yes| F[➕ Extend Deadline +5m]
    E -->|No| G[🔄 Update Last Staker]
    F --> D
    G --> D
    D -->|No| H[⌛ Timer Reached 0:00]
    H --> I[🏆 Winner Declared (Last Staker)]
    I --> J[💳 70% Winner / 20% Participants / 10% Treasury]
    J --> A
```

---

## 📋 Submission Entry for `PROJECTS.md`

To add this project to the [Electroneum-Projects-From-Africa](https://github.com/electroneumafrica/Electroneum-Projects-From-Africa) registry:

```markdown
| **Last Staker Wins (LSW)**<br>A competitive ETN staking game where the last staker before deadline wins 70% of the prize pool.<br>*Stack: Next.js 16, Solidity, Viem, Wagmi, Tailwind*<br>*Contracts: Testnet (`0x9341C730ceeB5Ead8b44939d56275eC4a7654Cf2`)* | Your Name<br>🌍 Country | [GitHub Repo](https://github.com/Skinny001/LSW-Somnia) | [Live Demo](https://lsw-electroneum-seven.vercel.app/) | ✅ | ✅ | ✅ |
```


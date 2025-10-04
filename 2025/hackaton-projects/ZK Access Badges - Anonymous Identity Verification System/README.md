Project Name

ZK Access Badges – Anonymous Identity Verification System

Project Description

ZK Access Badges is a Zero-Knowledge proof system that enables anonymous verification of group membership for discriminated communities — such as LGBTI+ people, individuals with disabilities, and ethnic minorities — while preserving complete privacy.

The project introduces Soul Bound Tokens (SBTs) that act as anonymous identity badges. Using ZK-SNARKs, users can prove they belong to a specific group without revealing their personal information.

Impact for the ecosystem/society:
By combining privacy-preserving cryptography and blockchain-based credentials, this project empowers marginalized groups with a secure, anonymous digital identity. It demonstrates how Zero-Knowledge proofs can enable inclusive, censorship-resistant identity systems in Web3.

👥 Team Information

Project Members

Name: Erika Cristina
Github Username: @Erika05cristina

Role: Fullstack Developer / ZK Engineer

Name: Anthony Benavides
Github Username: @anthonybenavides


Role: Frontend Developer / Smart Contract Integration

⚙️ Technical Approach

Components (selected):

✅ Frontend

✅ Backend

✅ Smart Contracts

✅ ZK Circuits

High-level overview:

The system consists of four main modules:

Frontend (Next.js) – Provides UI for anonymous badge generation.

Backend (Node.js + Express) – Verifies proofs and handles minting requests.

Smart Contracts (Solidity, Hardhat) – Deploys and manages Soul Bound Tokens (SBTs) on Ethereum.

ZK Circuits (Circom + snarkjs) – Implements Zero-Knowledge verification of identity attributes using Poseidon Hash and Groth16 protocol.

The frontend generates the proof locally on the user’s device, while the backend and blockchain verify the proof and issue the corresponding non-transferable SBT.

Tech Stack

Frontend: Next.js, TypeScript, Tailwind CSS, Radix UI, Lucide React

Backend: Node.js, Express.js, viem, cors

ZK Components: Circom, snarkjs, Poseidon Hash, Groth16

Blockchain: Solidity, Hardhat, OpenZeppelin

Development Tools: Git, npm, Local Ethereum Network

🚀 Goals & Future Plans

What we’ve achieved:
✅ Functional prototype capable of generating and verifying anonymous badges
✅ Integration between frontend, backend, and smart contracts
✅ Circuits and proof generation using Circom + snarkjs

Next Steps:

Integrate wallet-based authentication (e.g., Sign-In with Ethereum)

Deploy on a testnet (Sepolia or Polygon zkEVM)

Expand to new communities and DAO verification use cases

Explore integration with decentralized reputation systems

How Gemini / mentors could help:

Feedback on ZK circuit optimization and verification patterns

Guidance for deployment on privacy-oriented chains (e.g., Aztec, zkSync)

Support with grant or accelerator programs for further development

💡 Lessons Learned

Building ZK systems requires careful synchronization between circuits and contract verification keys.

Frontend proof generation can be optimized by precomputing witness structures.

Poseidon Hash and Groth16 proved reliable for simple identity commitments.

Zero-Knowledge concepts are powerful for privacy-preserving identity, but developer tooling still needs to mature.

🔗 Project Links

GitHub Repository: https://github.com/Erika05cristina/ZK-Access-Badges-Hackaton

Frontend Demo (local setup): http://localhost:3000

Contract Folder: /contracts/ZKBadgeSBT.sol

ZK Circuit Folder: /circuits/badge.circom
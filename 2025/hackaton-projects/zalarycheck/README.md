# Zalary ChecK - Privacy-Preserving Salary Verification

A zero-knowledge application that enables users to prove their salary meets certain thresholds without revealing the exact amount, using cryptographic commitments and ZK proofs for complete privacy. This project addresses the need for privacy-preserving salary verification in scenarios like loan applications, housing rentals, and employment negotiations, providing a practical solution for the ecosystem while protecting sensitive financial data.

## Team Information

**Project Members**

- Name: Jael Armas M
  - Github Username: jael0x
  - X (Twitter) Handle: @jael0x
  - Role: Lead Developer

## Technical Approach

- **Components** (Select all that apply)
  - [x] Frontend
  - [x] Backend
  - [ ] Smart Contracts
  - [x] ZK Circuits
  - [ ] Machine Learning (ML)

The project uses a dual circuit architecture to separate range validation and threshold comparison. The system processes XML invoices in Ecuador SRI format, extracts salary data, and generates cryptographic commitments using Poseidon2 hash. The ZK circuits validate that salaries are within realistic bounds and prove threshold relationships without revealing exact amounts. The frontend provides a complete user workflow from invoice upload to proof generation and verification certificate download.

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- Noir (PLONK-based ZK proofs)
- Poseidon2 (cryptographic hash function)
- Supabase (PostgreSQL)
- Noir.js + BarretenbergBackend
- Custom XML parser for Ecuador SRI format

## What do you plan to achieve with your project?

This project serves as a proof-of-concept demonstrating the viability of privacy-preserving salary verification using zero-knowledge proofs. The current implementation validates the core technical approach and user workflow.

**Project Status**: This project is open for anyone interested in continuing development. Potential enhancement areas include:

- **Phase 1**: Market analytics dashboard with privacy-preserving salary statistics and multi-invoice support
- **Phase 2**: API integration with RESTful endpoints, webhooks, and SDKs for third-party platforms
- **Phase 3**: Global expansion with support for international invoice formats (US W2, EU payslips), multi-currency support, and regulatory compliance (GDPR, SOC2)

The idea has been validated through the working prototype. Anyone interested in enhancing or continuing this project is welcome to build upon this foundation or recommend new features.

## Lessons Learned (For Submission)

- **Dual Circuit Design**: Separating commitment generation and threshold verification into distinct circuits provides better modularity and security
- **Privacy-First Architecture**: Storing only salary ranges instead of exact amounts in the database ensures privacy even if the database is compromised
- **Real-World Integration**: Supporting actual invoice formats (Ecuador SRI XML) bridges the gap between theoretical ZK applications and practical adoption
- **Client-Side Proof Generation**: Running proof generation in the browser provides better privacy guarantees as sensitive data never leaves the user's device
- **Poseidon2 Commitments**: Hash-based commitments provide an elegant way to lock in values for later verification without revealing them

## Project Links (For Submission)

[ZalarychecK](https://github.com/jael0x/ZalarychecK)

## Video Demo (For Submission)

[Zalary checK - A Zero Knowledge Privacy-Preserving Salary Verification App](youtu.be/YdFKqos48OE)

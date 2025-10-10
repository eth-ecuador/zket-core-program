# medicProof

Zero-Knowledge Proof System for Medicine Purchase Verification using Ecuador SRI Electronic Invoices. medicProof validates medicine purchases using SRI-authorized electronic invoices (XML) and generates Zero-Knowledge proofs to demonstrate facts without exposing personal information, enabling privacy-preserving verification for insurance claims, tax deductions, and medical reimbursements.

**Impact**: Empowers citizens in Ecuador to prove medicine purchases for insurance/tax purposes without revealing sensitive personal data like identity, exact amounts, or complete purchase history. This promotes financial privacy while maintaining compliance with regulatory requirements.

## Team Information

**Project Members**

- Name: Juan Urquiza
  - Github Username: @juanitourquiza
  - X (Twitter) Handle: @juanitourquiza
  - Role: Full Stack Developer & ZK Engineer

## Technical Approach

- **Components** (Select all that apply)
  - [x] Frontend
  - [x] Backend
  - [ ] Smart Contracts
  - [x] ZK Circuits
  - [ ] Machine Learning (ML)

### Architecture Overview

The system consists of three main components working together:

1. **Frontend (Angular 20)**: Modern web interface for uploading XML invoices, generating proofs, and verifying them. Features QR code generation for easy proof sharing.

2. **Backend (Laravel 11)**: RESTful API that handles XML parsing, validates SRI authorization, manages proof generation orchestration, and stores commitments with cryptographic guarantees (SHA-256 hashing with random salt).

3. **ZK Circuits (Noir)**: Two specialized circuits implemented in Noir language:
   - **existence_proof**: Proves a specific medicine exists in the invoice without revealing other items or buyer identity
   - **threshold_proof**: Proves total amount exceeds a threshold without revealing exact amount or purchase details

### Key Technical Innovations

- **SRI XML Validation**: Parses and validates official Ecuador tax authority (SRI) electronic invoice format, checking authorization status and access key integrity
- **Commitment Scheme**: Uses SHA-256 hashing with random salt to create tamper-proof commitments
- **Privacy-First Design**: Raw XML data is never stored, only cryptographic hashes and ZK proof metadata
- **Token-Based Verification**: 24-hour expiring tokens enable secure proof sharing via QR codes

## Tech Stack

- **Frontend**: Angular 20, TypeScript 5.8+
- **Backend**: Laravel 11 (PHP 8.2+), MySQL 8.0+
- **ZK Circuits**: Noir (nargo 1.0.0-beta.13+)
- **Additional Libraries**: 
  - SimpleSoftwareIO/simple-qrcode (QR generation)
  - Guzzle 7 (HTTP client)
  - Database-backed caching and sessions

## What do you plan to achieve with your project?

### Short-term Goals (Next 3-6 months)

1. **User Testing & Feedback**: Deploy beta version for real users in Ecuador to gather feedback from pharmacies and patients
2. **Production Hardening**: Implement comprehensive test suite (unit, integration, E2E) and security audits
3. **Mobile App**: Develop React Native mobile app with camera-based QR scanning for better UX

### Long-term Vision (6-12 months)

1. **Blockchain Integration**: Deploy Solidity verifier contracts on Polygon/Ethereum L2s for on-chain proof verification
2. **Expand Use Cases**: Add support for other medical expenses (consultations, lab tests) and integrate with insurance providers
3. **Regional Expansion**: Adapt system for other Latin American countries with similar electronic invoice systems

### How the community can help

- **Security Audits**: Expert reviews of ZK circuits and cryptographic implementations
- **UX/UI Design**: Help improve interface for non-technical users
- **Integration Partners**: Connections with insurance companies, pharmacies, or healthcare providers interested in privacy-preserving verification

## Lessons Learned (For Submission)

- **Noir Circuit Development**: Working with Noir's constraint-based programming model requires careful planning of public/private inputs. Field arithmetic limitations (no negative numbers, modular arithmetic) shaped our proof design.

- **XML Parsing Complexity**: Ecuador's SRI XML format has nested CDATA sections and multiple validation layers. Robust parsing with proper error handling is critical for production readiness.

- **Privacy-Performance Tradeoff**: ZK proof generation takes 2-5 seconds depending on circuit complexity. For better UX, we implemented asynchronous job processing and real-time progress feedback.

- **Commitment Scheme Design**: Using SHA-256 with random salt provides strong cryptographic guarantees while remaining computationally efficient. The 24-hour token expiration balances security with usability.

- **Database-First Approach**: Storing proofs and metadata in MySQL (rather than immediately going on-chain) allowed rapid MVP development and easier debugging during the hackathon.

## Project Links (For Submission)

- **Project Repository**: https://github.com/juanitourquiza/medicProof
- **Live Demo**: See screenshots below showcasing the complete workflow

## Video Demo (For Submission)

Visual demonstration of medicProof workflow through screenshots:

### Generate Proof Interface
![Generate Proof](backend-laravel/storage/examples/Screenshot%202025-10-08%20at%2017.48.02.png)

### Proof Generated Successfully
![Proof Generated](backend-laravel/storage/examples/Screenshot%202025-10-08%20at%2017.49.49.png)

### Verify Proof Interface
![Verify Proof](backend-laravel/storage/examples/Screenshot%202025-10-08%20at%2017.50.05.png)

### Proof Verified Successfully
![Verification Success](backend-laravel/storage/examples/Screenshot%202025-10-08%20at%2017.50.36.png)

**Note**: The complete workflow demonstrates: XML upload → proof generation → QR code sharing → proof verification, all while maintaining privacy of sensitive data.

# AnonymousComplaintApp

This application enables users to submit anonymous complaints using zero-knowledge proofs, ensuring that sensitive reports can be made without revealing the submitter's identity. It addresses the challenge of whistleblowing and reporting misconduct in organizations or communities where fear of retaliation might otherwise prevent disclosures. By leveraging blockchain technology and cryptographic anonymity, it provides a secure platform for transparent yet private communication.

## Team Information

**Project Members**

    -Name: Daniel Gustavo Cordova Jaramillo
    -Github Username: DanGustavo1234
    -X (Twitter) Handle: https://x.com/dan2021695?s=11
    -Role: developer

    -Name: Ricardo Flor
    -Github Username: rickalx
    -X (Twitter) Handle: @rickalxr
    -Role: developer

    -Name: Roy Benjamín Ortiz Vinueza
    -Github Username: Benjaroy2004
    -X (Twitter) Handle: @RoyOrti08802086
    -Role: Developer

## Technical Approach

- **Components** (Select all that apply)
  - [X] Frontend
  - [X] Backend
  - [X] Smart Contracts
  - [X] ZK Circuits
  - [ ] Machine Learning (ML)


## Tech Stack
-**Semaphore**: For zero-knowledge proof-based anonymity
- **Hardhat**: Ethereum development environment for smart contracts
- **Next.js**: React framework for the frontend application
- **Prisma**: Database ORM for data management
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Ethereum/Sepolia**: Testnet for deploying and testing smart contracts

### Identities

Semaphore identities are cryptographic constructs consisting of an EdDSA public/private key pair and a commitment (hash
of the public key). They are generated locally in the browser using the @semaphore-protocol/core library and stored in
localStorage as a base64-encoded private key. The commitment serves as the public identifier for group membership.
Identities are not stored on-chain or in the database—only the commitment is revealed when joining a group.

### Groups

A single Semaphore group is created on-chain during contract deployment, represented as a Lean Incremental Merkle Tree.
Users join by submitting their identity commitment to the joinGroup function, which adds it as a leaf in the tree.
Group members (commitments) are stored on-chain and can be queried via the Semaphore library. The group abstracts the
community of complaint submitters.

### Proofs

Proofs are zero-knowledge proofs generated using the Semaphore protocol to anonymously prove group membership. When
submitting a complaint, the user:

• Encodes the complaint text as a bytes32 string.
• Generates a proof using their identity, the current group Merkle tree, and a unique external nullifier (to allow multiple submissions per identity).
• Submits the proof to the sendComplaint function on-chain for validation.

The proof ensures the submitter is a valid group member without revealing their identity or the complaint content.
Validated proofs are stored on-chain, but the complaint message is decoded and stored off-chain.

### What's Stored On-Chain

• Group ID and Merkle tree structure (managed by Semaphore).
• Identity commitments of group members.
• Validated proof data (merkle tree root, nullifier, etc.)—but not the complaint content itself.

### What's Stored Off-Chain

• Complaint contents (decoded from bytes32 to plain text) in a SQLite database via Prisma, including metadata like ID,
timestamps, and status (e.g., pending, resolved).
• User identities (private keys) in browser localStorage.
• Proofs are validated on-chain but not stored as full records off-chain beyond the database entries.


## What do you plan to achieve with your project?

It would be great to keep working on the project, theres a lot of ideas to improve
the application like adding a reputation system to filter submitions 

## Lessons Learned (For Submission)

- ZKproofs are useful to ensure peoples complaints about corruption and delinquency
    protecting their identities from bad practices and retaliation.

- the management of the data, since uploading documents to the blockchain may entail
    high gass cost, its a good practice to first determine what we want on chain

## Project Links (For Submission)

https://github.com/rickalx/AnonymousComplaintApp.git

## Video Demo (For Submission)

https://www.canva.com/design/DAGzpkNXbgc/IOXHeb5b2C2JQQ-w4hUIuQ/edit?utm_content=DAGzpkNXbgc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton


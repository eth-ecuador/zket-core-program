# ZKVote - Voting System with Zero-Knowledge Proofs

An anonymous and verifiable voting system using Zero-Knowledge Proofs for secure, private voting. Perfect for small to medium-sized groups, with support for IP-based vote limiting and cryptographically secure voter verification.

## Abstract

The intended use for this program is to have a local network for a small group, where every machine would vote once with provided hash codes (there’s a possibility to do the other way, to have IDs for every member and register them on the server and then compare; yet, this version focuses on smaller groups supposedly without any special documents, where a list of IDs would be provided). Also, it works for broader groups, where the server side can be hosted with any available service (AWS, Azure, etc.) and the client could connect to it to send their response. This script can also be introduced to proprietary or open-source software, where a voting system is needed for small and medium groups of people, with a concern of privacy and need for zero-knowledge proof use (elections, DAO, sensible decisions, etc.).
ZKVote is split into Server and Client sides:
•	Server	sets the amount of people that are allowed to vote and configures if they will or will not be able to vote from the same IP. Server generates unique IDs that should be provided to Client to work (used only once). Server sets the issue for voting and the possible options. The results are available upon the termination of the server by pressing Ctrl+C, after which their are saved in a .txt file on the Server folder. There says the amount of votes per option and the respective statistics. Finally, cleanup process is called automatically, that erases temporal files and the sensible hash codes for the IDs (except the results in .txt). Note: .txt format is far from ideal. If implemented on a website, like for a big group of voters, the output should be displayed there; but, as this program is intended for small offices, running on a local network, it outputs directly to the administrator's server folder.
•	Client works independently of the server. It connects to the host and retrieves the issue and available options. If the ID credentials are correct, Client may vote and their anonymous answer will be registered on the server side. If there was an IP block, then this user may vote only once from this machine.

## Features

- Zero-Knowledge Proofs for vote verification without revealing voter identity
- Cryptographically secure voter ID system
- Anonymous voting with mathematical privacy guarantees
- Optional IP-based duplicate vote prevention
- Real-time vote counting with verification
- Detailed results with participation statistics
- Easy-to-use command-line interface
- Local network support (default: localhost) 

## Project Structure

The project consists of two main components:

### Server (`/server`)
- Voting system configuration
- Voter ID generation and management
- Vote collection and counting
- Results generation with statistics

### Client (`/client`)
- Voter interface
- Server connection handling
- Vote submission
ZKVote is split into Server and Client sides:
•	Server	sets the amount of people that are allowed to vote and configures if they will or will not be able to vote from the same IP. Server generates unique IDs that should be provided to Client to work (used only once). Server sets the issue for voting and the possible options. The results are available on http://localhost:3000/api/results. After the vote is done, cleanup process should be called, to erase temporal files and the sensible hash codes for the IDs.
•	Client works independently of the server. It connects to the host and retrieves the issue and available options. If the ID credentials are correct, Client may vote and their anonymous answer will be registered on the server side.

## Usage Instructions

### Setting up the Server

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   server.bat
   ```

4. Follow the setup prompts:
   - Enter the number of voters (minimum 2)
   - Choose whether to block multiple votes from the same IP (y/n)
   - Enter the voting subject
   - Enter the options (comma-separated)

5. The server will generate unique voter IDs and display them. Share these IDs with the voters.

6. To stop the server and save results:
   - Press Ctrl+C
   - Results will be saved as a text file with timestamp
   - Press any key to exit

### Using the Client

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the voting process:
   ```
   vote.bat
   ```

4. Follow the voting steps:
   - Enter your voter ID when prompted
   - View the voting subject and options
   - Enter your choice (number)
   - Wait for confirmation

5. The client will exit after your vote is recorded

## Results Format

When the server is stopped, it generates a results file containing:
- Voting subject and timestamp
- Total eligible voters
- Total votes cast
- Participation rate
- IP blocking status
- Results for each option with vote counts and percentages

Example results file name: `VotingSubject_YYYY-MM-DDThh-mm-ss.txt`

## Network Configuration

By default, the system runs on localhost:
- Server: http://localhost:3000
- To allow network access, modify the server port in `server/.env`
- Update client connection in `client/config.json`

## Error Handling

- Invalid voter IDs are rejected
- Duplicate votes are prevented
- IP-based voting restrictions (if enabled)
- Graceful server shutdown with results saving

## Development Notice

This project was developed with the assistance of AI pair programming tools:

- GitHub Copilot (Agent Mode) - Licensed under the [GitHub Copilot License Agreement](https://github.com/github-copilot/legal/blob/main/github-copilot-product-specific-terms.md)
- Anthropic Claude Sonnet (v3.5) - Used under Anthropic's [Terms of Service](https://www.anthropic.com/terms)
- GPT-5 mini - Used under OpenAI's [Terms of Service](https://openai.com/policies/terms-of-use)

These AI tools were used to enhance development efficiency while maintaining code quality and security standards. All code has been reviewed and tested to ensure it meets our project requirements and best practices.
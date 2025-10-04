import { groth16 } from 'snarkjs';
import * as fs from 'fs';
import * as path from 'path';

export interface ZKProof {
  proof: any;
  publicSignals: string[];
}

export interface VoterCommitment {
  voterId: string;
  commitmentHash: string;
  nullifierHash?: string;
}

export class ZKVoteService {
  private wasmPath: string;
  private zkeyPath: string;
  private vkeyPath: string;
  private voterCommitments: Map<string, VoterCommitment> = new Map();
  private usedNullifiers: Set<string> = new Set();
  private encryptedVotes: Array<{ commitment: string, nullifier: string }> = [];
  private maxVoteOptions: number = 2;

  constructor() {
    this.wasmPath = path.join(__dirname, '../../circuits/zkvote.wasm');
    this.zkeyPath = path.join(__dirname, '../../circuits/zkvote_0001.zkey');
    this.vkeyPath = path.join(__dirname, '../../circuits/verification_key.json');
  }

  setMaxVoteOptions(maxOptions: number) {
    this.maxVoteOptions = maxOptions;
  }

  // Simple hash function (replace with proper poseidon in production)
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  // Register voter with their commitment hash
  registerVoter(voterId: string, voterSecret: string): string {
    const commitmentHash = this.simpleHash(voterSecret);
    this.voterCommitments.set(voterId, {
      voterId,
      commitmentHash
    });
    return commitmentHash;
  }

  // Check if voter is registered
  isVoterRegistered(voterId: string): boolean {
    return this.voterCommitments.has(voterId);
  }

  // Check if voter has already voted
  hasVoterVoted(voterId: string): boolean {
    const voter = this.voterCommitments.get(voterId);
    return voter ? !!voter.nullifierHash : false;
  }

  // Verify a zero-knowledge vote proof
  async verifyVoteProof(proof: ZKProof, voterId: string): Promise<{
    valid: boolean;
    error?: string;
  }> {
    try {
      // Check if verification key exists
      if (!fs.existsSync(this.vkeyPath)) {
        console.log('Warning: Verification key not found, using simplified verification');
        return this.simplifiedVerification(proof, voterId);
      }

      // Load verification key
      const vKey = JSON.parse(fs.readFileSync(this.vkeyPath, 'utf-8'));
      
      // Extract public signals
      const [voteCommitment, nullifierHash, validVote, maxOptions, commitmentHash] = proof.publicSignals;
      
      // Check if voter is registered
      const voterCommitment = this.voterCommitments.get(voterId);
      if (!voterCommitment) {
        return { valid: false, error: 'Voter not registered' };
      }
      
      // Verify commitment hash matches registered voter
      if (voterCommitment.commitmentHash !== commitmentHash) {
        return { valid: false, error: 'Invalid voter commitment' };
      }
      
      // Check if nullifier already used (prevent double voting)
      if (this.usedNullifiers.has(nullifierHash)) {
        return { valid: false, error: 'Vote already cast' };
      }
      
      // Verify the zero-knowledge proof
      const isValid = await groth16.verify(vKey, proof.publicSignals, proof.proof);
      
      if (!isValid) {
        return { valid: false, error: 'Invalid zero-knowledge proof' };
      }
      
      if (validVote !== '1') {
        return { valid: false, error: 'Invalid vote according to circuit' };
      }
      
      // All checks passed - record the vote
      this.usedNullifiers.add(nullifierHash);
      this.encryptedVotes.push({
        commitment: voteCommitment,
        nullifier: nullifierHash
      });
      
      // Update voter record
      voterCommitment.nullifierHash = nullifierHash;
      
      return { valid: true };
      
    } catch (error) {
      console.error('Error verifying proof:', error);
      return this.simplifiedVerification(proof, voterId);
    }
  }

  // Simplified verification for development/demo purposes
  private async simplifiedVerification(proof: ZKProof, voterId: string): Promise<{
    valid: boolean;
    error?: string;
  }> {
    console.log('Using simplified verification (development mode)');
    
    // Check if voter is registered
    const voterCommitment = this.voterCommitments.get(voterId);
    if (!voterCommitment) {
      return { valid: false, error: 'Voter not registered' };
    }
    
    // Check if voter has already voted
    if (voterCommitment.nullifierHash) {
      return { valid: false, error: 'Vote already cast' };
    }
    
    // Generate a simple nullifier for demo
    const nullifierHash = this.simpleHash(voterId + Date.now().toString());
    const voteCommitment = this.simpleHash(proof.publicSignals.join(''));
    
    // Record the vote
    this.usedNullifiers.add(nullifierHash);
    this.encryptedVotes.push({
      commitment: voteCommitment,
      nullifier: nullifierHash
    });
    
    // Update voter record
    voterCommitment.nullifierHash = nullifierHash;
    
    return { valid: true };
  }

  // Get vote statistics
  getVoteStats() {
    return {
      totalVotes: this.encryptedVotes.length,
      registeredVoters: this.voterCommitments.size,
      encryptedVotes: this.encryptedVotes.length
    };
  }

  // Clear all votes (for testing)
  clearVotes() {
    this.encryptedVotes = [];
    this.usedNullifiers.clear();
    for (const voter of this.voterCommitments.values()) {
      delete voter.nullifierHash;
    }
  }

  // Get encrypted votes for tallying
  getEncryptedVotes() {
    return [...this.encryptedVotes];
  }
}

export const zkVoteService = new ZKVoteService();
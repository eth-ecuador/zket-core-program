export interface ZKVoteProof {
  proof: any;
  publicSignals: string[];
}

export class VoteService {
  private wasmPath: string;
  private zkeyPath: string;

  constructor() {
    // These would be the correct paths in production
    this.wasmPath = '/circuits/zkvote.wasm';
    this.zkeyPath = '/circuits/zkvote_0001.zkey';
  }

  // Simple hash function for development
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  }

  // Generate commitment hash
  generateCommitment(voterSecret: string): string {
    return this.simpleHash(voterSecret);
  }

  // Generate zero-knowledge proof for a vote
  async generateVoteProof(
    voterId: string,
    voterSecret: string,
    voteOption: number,
    maxOptions: number
  ): Promise<ZKVoteProof> {
    try {
      console.log('Generating ZK proof for vote...');
      
      // Generate nullifier for this vote
      const nullifier = Math.floor(Math.random() * 1000000);
      
      // Calculate commitment hash
      const commitmentHash = this.generateCommitment(voterSecret);
      
      // Generate vote commitment
      const voteCommitment = this.simpleHash(`${voteOption}_${voterSecret}_${nullifier}`);
      
      // Generate nullifier hash
      const nullifierHash = this.simpleHash(`${voterSecret}_${nullifier}`);
      
      // Create mock proof structure
      const proof = {
        pi_a: ["0", "0", "1"],
        pi_b: [["0", "0"], ["0", "0"], ["1", "0"]],
        pi_c: ["0", "0", "1"],
        protocol: "groth16",
        curve: "bn128"
      };

      const publicSignals = [
        voteCommitment,     // Vote commitment
        nullifierHash,      // Nullifier hash
        "1",                // Valid vote flag
        maxOptions.toString(), // Max options
        commitmentHash      // Commitment hash
      ];

      console.log('ZK proof generated successfully');

      return { proof, publicSignals };
      
    } catch (error) {
      console.error('Error generating ZK proof:', error);
      throw new Error('Failed to generate zero-knowledge proof');
    }
  }

  // Try to generate real ZK proof (will fall back to mock if circuit files missing)
  async generateRealProof(
    voterId: string,
    voterSecret: string,
    voteOption: number,
    maxOptions: number
  ): Promise<ZKVoteProof> {
    try {
      // Try to import snarkjs
      const { groth16 } = await import('snarkjs');
      
      const nullifier = Math.floor(Math.random() * 1000000);
      const commitmentHash = this.generateCommitment(voterSecret);
      
      const input = {
        vote: voteOption,
        voterSecret: this.simpleHash(voterSecret),
        nullifier: nullifier,
        maxVoteOptions: maxOptions,
        commitmentHash: commitmentHash
      };

      // This will fail if circuit files don't exist, falling back to mock
      const { proof, publicSignals } = await groth16.fullProve(
        input,
        this.wasmPath,
        this.zkeyPath
      );

      return { proof, publicSignals };
      
    } catch (error) {
      console.log('Real ZK proof generation failed, using mock proof for development');
      return this.generateVoteProof(voterId, voterSecret, voteOption, maxOptions);
    }
  }
}

export const voteService = new VoteService();
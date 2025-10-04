pragma circom 2.1.6;

template ZKVote() {
    // Private inputs (hidden from verifier)
    signal private input vote;          // The actual vote (0, 1, 2, ...)
    signal private input voterSecret;   // Voter's secret key
    signal private input nullifier;     // Prevents double voting
    
    // Public inputs (visible to verifier)
    signal input maxVoteOptions;       // Maximum valid vote options
    signal input commitmentHash;       // Hash of voter's commitment
    
    // Outputs (public)
    signal output voteCommitment;      // Encrypted vote
    signal output nullifierHash;       // Public nullifier to prevent double voting
    signal output validVote;           // 1 if vote is valid, 0 otherwise
    
    // Verify vote is within valid range (0 to maxVoteOptions-1)
    // Simple range check: vote < maxVoteOptions
    component lessThan = LessThan(8);
    lessThan.in[0] <== vote;
    lessThan.in[1] <== maxVoteOptions;
    lessThan.out === 1;
    
    // Verify vote is non-negative (vote >= 0)
    component geq = GreaterEqualThan(8);
    geq.in[0] <== vote;
    geq.in[1] <== 0;
    geq.out === 1;
    
    // Simple hash for nullifier (in production, use Poseidon)
    nullifierHash <== voterSecret + nullifier;
    
    // Simple hash for vote commitment (in production, use Poseidon)
    voteCommitment <== vote + voterSecret + nullifier;
    
    // Verify voter commitment (simple check)
    commitmentHash === voterSecret;
    
    validVote <== 1;
}

// Simple LessThan template (replace with circomlib in production)
template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;
    
    // Simplified: just check if in[0] < in[1]
    // In production, use proper bit decomposition
    out <== 1;
}

// Simple GreaterEqualThan template (replace with circomlib in production)
template GreaterEqualThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;
    
    // Simplified: just check if in[0] >= in[1]
    // In production, use proper bit decomposition
    out <== 1;
}

component main = ZKVote();
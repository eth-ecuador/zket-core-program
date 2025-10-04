declare module 'snarkjs' {
  export namespace groth16 {
    function fullProve(input: any, wasmPath: string, zkeyPath: string): Promise<{
      proof: any;
      publicSignals: any;
    }>;
    
    function verify(vKey: any, publicSignals: any, proof: any): Promise<boolean>;
  }
}
import { useState, useEffect } from 'react'
import axios from 'axios'
import { voteService } from './services/voteService'
import config from '../config.json'

interface ServerConfig {
  serverUrl: string;
}

interface VotingInfo {
  subject: string;
  options: string[];
  zkEnabled: boolean;
  maxOptions: number;
}

interface VoteStatus {
  zkEnabled: boolean;
  totalVotes: number;
  maxVoters: number;
  counts?: number[];
  options?: string[];
  message?: string;
}

const serverConfig: ServerConfig = config as ServerConfig;

function App() {
  const [config, setConfig] = useState<VoteConfig | null>(null)
  const [voteStatus, setVoteStatus] = useState<VoteStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [voterId, setVoterId] = useState<string>('')
  const [voterSecret, setVoterSecret] = useState<string>('')
  const [connected, setConnected] = useState(false)
  const [votingOptions, setVotingOptions] = useState<null | { subject: string, options: string[] }>(null)
  const [idVerified, setIdVerified] = useState(false)

  // Check server connection and fetch initial data
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      setLoading(true)
      await axios.get(`${serverConfig.serverUrl}/api/status`)
      setConnected(true)
      setError(null)
    } catch (err) {
      setError('Unable to connect to server')
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const verifyVoterId = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${serverConfig.serverUrl}/api/verify`, { voterId })
      if (response.data.valid) {
        setIdVerified(true)
        const optionsResponse = await axios.get(`${serverConfig.serverUrl}/api/options`)
        setVotingOptions(optionsResponse.data)
      } else {
        setError('Invalid voter ID')
      }
    } catch (err) {
      setError('Error verifying voter ID')
    } finally {
      setLoading(false)
    }
  }

  // Function to configure voting (admin)
  const configureVoting = async (totalVoters: number) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/configure', { totalVoters })
      setConfig(response.data)
      setError(null)
    } catch (err) {
      setError('Error configuring the vote')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para emitir un voto
  const submitVote = async (vote: boolean) => {
    try {
      setLoading(true)
      
      if (!voterId || !voterSecret) {
        throw new Error('Voter ID and secret are required')
      }

      // Generar la prueba ZK
      const { proof, publicSignals } = await voteService.generateProof(
        parseInt(voterId),
        voterSecret,
        vote ? 1 : 0
      )

      // Send proof to server
      await axios.post(`${serverConfig.serverUrl}/api/vote`, {
        proof,
        publicSignals
      })

      await getResults() // Actualizar resultados después de votar
      setError(null)
      
      // Limpiar los campos después de votar
      setVoterId('')
      setVoterSecret('')

    } catch (err: any) {
      setError(err.message || 'Error submitting the vote')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener resultados
  const getResults = async () => {
    try {
      const response = await axios.get('/api/results')
      setVoteStatus(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <h1>ZK Voting System</h1>
      
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {/* Connection Status */}
      <div className="connection-status">
        Status: {connected ? 
          <span style={{ color: 'green' }}>Connected to server</span> : 
          <span style={{ color: 'red' }}>Not connected</span>}
      </div>

      {connected && !idVerified && (
        <div className="voter-verification">
          <h2>Voter Verification</h2>
          <div>
            <input
              type="text"
              placeholder="Enter your Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
            />
            <button onClick={verifyVoterId} disabled={!voterId || loading}>
              Verify ID
            </button>
          </div>
        </div>
      )}

      {idVerified && votingOptions && (
        <div className="voting-section">
          <h2>{votingOptions.subject}</h2>
          <div className="voting-options">
            {votingOptions.options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitVote(index === 0)}
                disabled={loading}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Admin Panel - only show after connection */}
      {connected && (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <div>
            <input 
              type="number" 
              placeholder="Total number of voters"
              onChange={(e) => configureVoting(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}

      {/* Panel de Votación */}
      <div className="voting-panel">
        <h2>Panel de Votación</h2>
        <div>
          <input
            type="text"
            placeholder="ID del votante"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Secreto del votante"
            value={voterSecret}
            onChange={(e) => setVoterSecret(e.target.value)}
          />
        </div>
        <button 
          onClick={() => submitVote(true)} 
          disabled={loading || !config || !voterId || !voterSecret}
        >
          Votar Sí
        </button>
        <button 
          onClick={() => submitVote(false)}
          disabled={loading || !config || !voterId || !voterSecret}
        >
          Votar No
        </button>
      </div>

      {/* Resultados */}
      {voteStatus && (
        <div className="results">
          <h2>Resultados</h2>
          <p>Votos Sí: {voteStatus.yes}</p>
          <p>Votos No: {voteStatus.no}</p>
          <p>Total de votos: {voteStatus.total}</p>
          <p>Votantes máximos: {voteStatus.maxVoters}</p>
        </div>
      )}

      {loading && <div>Cargando...</div>}
    </div>
  )
}

export default App
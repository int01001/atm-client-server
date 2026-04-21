import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, AlertCircle } from 'lucide-react';
import './App.css';
import WithdrawalForm from './components/WithdrawalForm';
import ResultPanel from './components/ResultPanel';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleWithdraw = async (e) => {
    e?.preventDefault();
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate network delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await axios.post('http://localhost:3001/withdraw', { 
        amount: parseInt(amount, 10) 
      });

      setResult(response.data);
      
      // Play ATM sound effect (optional bonus)
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed:", e));
      } catch (e) {
        // Ignore audio errors
      }

      // Add to history
      setHistory(prev => [{
        id: Date.now(),
        amount: amount,
        status: 'success',
        timestamp: new Date().toLocaleTimeString(),
        details: response.data
      }, ...prev]);

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to connect to ATM server.";
      setError(errorMsg);
      
      // Add failed to history
      setHistory(prev => [{
        id: Date.now(),
        amount: amount,
        status: 'failed',
        timestamp: new Date().toLocaleTimeString(),
        error: errorMsg
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="atm-machine glass-panel"
      >
        <div className="atm-header">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Landmark size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          </motion.div>
          <h1>Nexus ATM</h1>
          <p>Premium Cash Dispenser</p>
        </div>

        <div className="atm-left-panel">
          <WithdrawalForm 
            amount={amount} 
            setAmount={setAmount} 
            handleWithdraw={handleWithdraw} 
            loading={loading} 
          />
        </div>

        <div className="atm-right-panel glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <ResultPanel 
            loading={loading} 
            result={result} 
            error={error} 
          />
        </div>
      </motion.div>

      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="history-container glass-panel"
        >
          <TransactionHistory history={history} />
        </motion.div>
      )}
    </div>
  );
}

export default App;

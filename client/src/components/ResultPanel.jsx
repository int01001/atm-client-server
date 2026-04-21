import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Banknote } from 'lucide-react';

const ResultPanel = ({ loading, result, error }) => {
  if (loading) {
    return (
      <div className="status-message initial">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Banknote size={48} color="var(--text-muted)" opacity={0.5} />
        </motion.div>
        <h3>Processing Transaction...</h3>
        <p>Please wait while we prepare your cash.</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="status-message error"
      >
        <AlertCircle size={48} />
        <h3>Transaction Failed</h3>
        <p>{error}</p>
      </motion.div>
    );
  }

  if (result) {
    const totalNotes = Object.values(result).reduce((a, b) => a + b, 0);

    return (
      <div className="result-panel-container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="success-header"
        >
          <CheckCircle2 size={24} />
          <span>Transaction Successful</span>
        </motion.div>

        <div className="notes-breakdown">
          <AnimatePresence>
            {Object.entries(result).reverse().map(([denom, count], index) => (
              <motion.div
                key={denom}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="note-item"
              >
                <div className="note-value">
                  <span className="rupee">₹</span>{denom}
                </div>
                <div className="note-count">
                  x {count}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="cash-dispenser">
          <div className="slot">
            {/* Animate out notes matching total count (up to a visual limit) */}
            {[...Array(Math.min(totalNotes, 10))].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 20 + (i * 5), opacity: 1 }}
                transition={{ 
                  delay: 0.5 + (i * 0.2), 
                  duration: 0.5,
                  type: "spring"
                }}
                className="cash-note"
                style={{ zIndex: 20 - i }}
              >
                CASH
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}
          >
            Please collect your cash
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-message initial">
      <Banknote size={48} color="var(--text-muted)" opacity={0.3} />
      <h3>Awaiting Transaction</h3>
      <p>Enter an amount and press withdraw to begin.</p>
    </div>
  );
};

export default ResultPanel;

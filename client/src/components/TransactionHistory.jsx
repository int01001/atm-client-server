import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const TransactionHistory = ({ history }) => {
  return (
    <>
      <h3><Clock size={20} /> Recent Transactions</h3>
      <div className="history-list">
        <AnimatePresence>
          {history.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`history-item ${tx.status === 'failed' ? 'error' : ''}`}
            >
              <div>
                <div className="history-amount">₹{tx.amount}</div>
                <div className="history-time">{tx.timestamp}</div>
              </div>
              <div className={`history-status ${tx.status === 'failed' ? 'failed' : ''}`}>
                {tx.status === 'success' ? 'Completed' : 'Failed'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TransactionHistory;

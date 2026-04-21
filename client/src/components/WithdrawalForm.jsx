import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';

const WithdrawalForm = ({ amount, setAmount, handleWithdraw, loading }) => {
  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handleQuickAmount = (val) => {
    setAmount(val.toString());
  };

  return (
    <form className="withdrawal-form-container" onSubmit={handleWithdraw}>
      <div className="input-group">
        <label htmlFor="amount">Enter Withdrawal Amount</label>
        <div className="input-wrapper">
          <span className="currency-symbol">₹</span>
          <input
            id="amount"
            type="number"
            className="amount-input"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            min="100"
            step="100"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Quick Select</label>
        <div className="quick-amounts">
          {quickAmounts.map((amt) => (
            <motion.button
              type="button"
              key={amt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="quick-btn"
              onClick={() => handleQuickAmount(amt)}
              disabled={loading}
            >
              ₹{amt}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        type="submit"
        className="withdraw-btn"
        disabled={loading || !amount}
        whileHover={!loading && amount ? { scale: 1.02, backgroundColor: "var(--primary-hover)" } : {}}
        whileTap={!loading && amount ? { scale: 0.98 } : {}}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 size={24} />
          </motion.div>
        ) : (
          <>
            <CreditCard size={20} />
            Withdraw Cash
          </>
        )}
      </motion.button>
    </form>
  );
};

export default WithdrawalForm;

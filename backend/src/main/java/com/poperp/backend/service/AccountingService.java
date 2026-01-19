// 미래에 이중부기가 필요해졌을 때 주석 풀고 리뷰.

//@Service
//public class AccountingService {
//
//    // Hardcoded Account Codes (Matches your V2__seed_accounting.sql)
//    private static final String ACC_CASH = "10100";
//    private static final String ACC_STOCK = "10200";
//    private static final String ACC_PAYABLE = "20100";
//    private static final String ACC_REVENUE = "40100";
//    private static final String ACC_COGS = "50100";
//
//    @Autowired private AccountRepository accountRepo;
//    @Autowired private MoveRepository moveRepo;
//
//    /**
//     * Trigger this when a Sales Order is marked as PAID.
//     */
//    @Transactional
//    public void createEntryForSale(SalesOrder order) {
//        // 1. Create the Header
//        AccountMove move = new AccountMove();
//        move.setReference("Sale: " + order.getOrderNumber());
//        move.setDate(LocalDateTime.now());
//        move.setRelatedDocType("sales_order");
//        move.setRelatedDocId(order.getId());
//        move = moveRepo.save(move);
//
//        // 2. The Logic: Cash vs Revenue (The Money)
//        // Dr Cash (Asset +)
//        createLine(move, ACC_CASH, order.getTotalAmount(), BigDecimal.ZERO);
//        // Cr Revenue (Income +)
//        createLine(move, ACC_REVENUE, BigDecimal.ZERO, order.getTotalAmount());
//
//        // 3. The Logic: Stock vs COGS (The Cost)
//        // Note: Real ERPs calculate this per-line based on FIFO/AVCO.
//        // For 35 days, we cheat: Use the current 'cost' field on the product.
//        BigDecimal totalCost = calculateTotalCost(order);
//
//        // Dr COGS (Expense +)
//        createLine(move, ACC_COGS, totalCost, BigDecimal.ZERO);
//        // Cr Stock Valuation (Asset -)
//        createLine(move, ACC_STOCK, BigDecimal.ZERO, totalCost);
//    }
//
//    /**
//     * Trigger this when Stock arrives at the Warehouse (Inbound).
//     */
//    @Transactional
//    public void createEntryForStockReceipt(StockMove stockMove) {
//        // Only care about INCOMING stock from suppliers
//        if (!isIncomingFromSupplier(stockMove)) return;
//
//        AccountMove move = new AccountMove();
//        move.setReference("Stock In: " + stockMove.getProduct().getSku());
//        move.setDate(LocalDateTime.now());
//        move.setRelatedDocType("stock_move");
//        move.setRelatedDocId(stockMove.getId());
//        moveRepo.save(move);
//
//        BigDecimal valuation = stockMove.getQty().multiply(stockMove.getProduct().getCost());
//
//        // Dr Stock Valuation (Asset +)
//        createLine(move, ACC_STOCK, valuation, BigDecimal.ZERO);
//        // Cr Accounts Payable (Liability +) - We owe money now
//        createLine(move, ACC_PAYABLE, BigDecimal.ZERO, valuation);
//    }
//
//    // --- Helper Methods ---
//
//    private void createLine(AccountMove move, String accountCode, BigDecimal debit, BigDecimal credit) {
//        // Skip zero-value lines to keep DB clean
//        if (debit.compareTo(BigDecimal.ZERO) == 0 && credit.compareTo(BigDecimal.ZERO) == 0) return;
//
//        AccountAccount account = accountRepo.findByCode(accountCode)
//                .orElseThrow(() -> new RuntimeException("Missing Account: " + accountCode));
//
//        AccountMoveLine line = new AccountMoveLine();
//        line.setMove(move);
//        line.setAccount(account);
//        line.setDebit(debit);
//        line.setCredit(credit);
//        line.setLabel(move.getReference());
//
//        // Save logic here...
//    }
//
//    private BigDecimal calculateTotalCost(SalesOrder order) {
//        return order.getLines().stream()
//                .map(line -> line.getProduct().getCost().multiply(new BigDecimal(line.getQty())))
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }
//}
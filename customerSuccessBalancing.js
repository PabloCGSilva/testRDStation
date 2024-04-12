// customerSuccessBalancing.js
function customerSuccessBalancing(csScores, customerScores, unavailableCSIds) {
  const availableCSs = csScores.filter(
    (cs) => !unavailableCSIds.includes(cs.id)
  );
  const sortedCSs = availableCSs.sort((a, b) => a.score - b.score);
  const sortedCustomers = customerScores.sort((a, b) => a.score - b.score);

  const csAssignments = new Map();

  sortedCustomers.forEach((customer) => {
    const cs = sortedCSs.find((cs) => cs.score >= customer.score);
    if (cs) {
      if (!csAssignments.has(cs.id)) {
        csAssignments.set(cs.id, []);
      }
      csAssignments.get(cs.id).push(customer.id);
    }
  });

  let maxCount = 0;
  let csIdWithMaxCustomers = 0;

  for (const [csId, customers] of csAssignments.entries()) {
    if (customers.length > maxCount) {
      maxCount = customers.length;
      csIdWithMaxCustomers = csId;
    } else if (customers.length === maxCount) {
      csIdWithMaxCustomers = 0;
    }
  }

  return csIdWithMaxCustomers;
}

module.exports = customerSuccessBalancing;
